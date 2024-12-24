import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepo } from '@application/order/order.repo';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';
import { AppUserPointService } from '@application/app-user-point/app-user-point.service';
import { Order } from '@domain/order/order.entity';
import { AppUserAddress } from '@domain/app-user/app-user-address.entity';
import { Product } from '@domain/product/product.entity';
import { CreateOrderProductReviewDto } from '@domain/order/dto/order-product-review.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly appUserPointService: AppUserPointService,

    private readonly orderRepo: OrderRepo,
  ) {}

  async createOrder(userAddress: AppUserAddress, products: Product[]) {
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

  async orderProductConfirm(dto: { id: bigint; userId: bigint }) {
    const { id, userId } = dto;

    const orderProduct =
      await this.orderRepo.findOneOrderProductWishOrderAndProduct(id);

    if (!orderProduct) {
      throw new NotFoundException();
    }

    if (orderProduct.order.userId !== userId) {
      throw new ForbiddenException();
    }

    orderProduct.confirm();

    const expirationAt = new Date();
    expirationAt.setDate(expirationAt.getDate() + 7);
    await this.appUserPointService.savePoint(userId, {
      point: orderProduct.product.price * 0.01,
      action: AppUserPointHistoryAction.ORDER_PRODUCT,
      actionId: orderProduct.id,
      expirationAt,
    });

    await this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  async createOrderProductReview(
    dto: CreateOrderProductReviewDto & {
      userId: bigint;
      orderProductId: bigint;
    },
  ) {
    const orderProduct = await this.orderRepo.findOneWishOrderProductReview(
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

    await this.orderRepo.saveProductReview(orderProductReview);

    return orderProductReview;
  }
}
