import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepo } from '@application/order/order.repo';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point.entity';
import { AppUserPointService } from '@application/app-user-point/app-user-point.service';
import { CreateOrderProductReviewDto } from '@application/order/order.dto';
import { Order } from '@domain/order/order.entity';
import { AppUserAddress } from '@domain/app-user/app-user-address.entity';
import { Product } from '@domain/product/product.entity';

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

  async orderProductDeliver(id: number) {
    const orderProduct = await this.orderRepo.findOneProductById(id);

    if (!orderProduct) {
      throw new NotFoundException();
    }

    orderProduct.deliver();

    await this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  async orderProductConfirm(dto: { id: number; userId: number }) {
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

    await this.appUserPointService.savePoint(
      userId,
      orderProduct.product.price * 0.01,
      AppUserPointHistoryAction.ORDER_PRODUCT,
      orderProduct.id,
    );

    await this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  async createOrderProductReview(dto: CreateOrderProductReviewDto) {
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
