import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepo } from '@application/order/order.repo';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';
import { AppUserPointService } from '@application/app-user-point/app-user-point.service';
import { Order } from '@domain/order/order.entity';
import { CreateOrderProductReviewDto } from '@domain/order/dto/order-product-review.dto';
import { PostOrdersAppReqDto } from '../../../../apps/app/src/api/order/orders/orders.app.dto';
import { ProductService } from '@application/product/product.service';
import { UserAddressService } from '../../../../apps/app/src/application/user/address/user-address.service';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class OrderService {
  constructor(
    private readonly productService: ProductService,
    private readonly userAddressService: UserAddressService,
    private readonly appUserPointService: AppUserPointService,

    private readonly orderRepo: OrderRepo,
  ) {}

  async createOrder(dto: PostOrdersAppReqDto & { userId: bigint }) {
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

    return await this.orderRepo.save(order);
  }

  async orderProductDeliver(id: bigint) {
    const orderProduct = await this.orderRepo.findOneProductById(id);

    if (!orderProduct) {
      throw new NotFoundException();
    }

    orderProduct.deliver();

    await this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  @Transactional()
  async orderProductConfirm(dto: { id: bigint; userId: bigint }) {
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

    const expirationAt = new Date();
    expirationAt.setDate(expirationAt.getDate() + 7);
    await this.appUserPointService.savePoint({
      userId,
      point: orderProduct.product.price * 0.01,
      action: AppUserPointHistoryAction.ORDER_PRODUCT,
      actionId: orderProduct.id,
      expirationAt,
    });

    await this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  @Transactional()
  async createOrderProductReview(
    dto: CreateOrderProductReviewDto & {
      userId: bigint;
      orderProductId: bigint;
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
