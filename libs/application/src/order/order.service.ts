import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepo } from '@application/order/order.repo';
import { AppUserPointService } from '@application/app-user-point/app-user-point.service';
import { Order } from '@domain/order/order.entity';
import { CreateOrderProductReviewDto } from '@domain/order/dto/order-product-review.dto';
import { PostOrdersAppReqDto } from '../../../../apps/app/src/api/order/orders/orders.app.dto';
import { ProductService } from '@application/product/product.service';
import { UserAddressService } from '../../../../apps/app/src/application/user/address/user-address.service';
import { Transactional } from 'typeorm-transactional';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly productService: ProductService,
    private readonly userAddressService: UserAddressService,
    private readonly appUserPointService: AppUserPointService,

    private readonly orderRepo: OrderRepo,
  ) {}

  @Transactional()
  async createOrder(dto: PostOrdersAppReqDto & { userId: number }) {
    // TODO user lazy loading
    const userAddress = await this.userAddressService.getUserAddressById(
      dto.userAddressId,
    );

    if (userAddress.userId !== dto.userId) {
      throw new ForbiddenException();
    }

    const products = await Promise.all(
      dto.productIds.map(async (id) => {
        return await this.productService.findOneProduct(id);
      }),
    );

    const order = Order.create(userAddress, products);
    const createOrder = await this.orderRepo.save(order);

    if (dto.point) {
      await this.appUserPointService.usePoint(dto.userId, {
        point: dto.point,
        action: AppUserPointHistoryAction.ORDER,
        actionId: createOrder.id,
      });
    }

    return order;
  }

  async orderProductDeliver(id: number) {
    const orderProduct = await this.orderRepo.findOneProductById(id);

    if (!orderProduct) {
      throw new NotFoundException();
    }

    orderProduct.deliver();

    await this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  @Transactional()
  async orderProductConfirm(dto: { id: number; userId: number }) {
    const { id, userId } = dto;

    const orderProduct =
      await this.orderRepo.findOneOrderProductWithOrderAndProduct(id);

    if (!orderProduct) {
      throw new NotFoundException();
    }

    if (orderProduct.order.userId !== userId) {
      throw new ForbiddenException();
    }

    orderProduct.confirm();

    await this.appUserPointService.savePointByOrderProduct(orderProduct);

    await this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  @Transactional()
  async createOrderProductReview(
    dto: CreateOrderProductReviewDto & {
      userId: number;
      orderProductId: number;
    },
  ) {
    const orderProduct =
      await this.orderRepo.findOneOrderProductWithOrderAndProductAndReview(
        dto.orderProductId,
      );
    if (!orderProduct) {
      throw new NotFoundException();
    }
    if (orderProduct.order.userId !== dto.userId) {
      throw new ForbiddenException();
    }

    const orderProductReview = orderProduct.createReview({
      score: dto.score,
      description: dto.description,
    });

    const createOrderProductReview =
      await this.orderRepo.saveProductReview(orderProductReview);
    createOrderProductReview.orderProduct = orderProduct;

    await this.appUserPointService.savePointByReview(createOrderProductReview);

    return orderProductReview;
  }
}
