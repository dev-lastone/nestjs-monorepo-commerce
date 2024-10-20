import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { OrderRepo } from '@domain/order/order.repo';
import { AppUserPointHistoryAction } from '@domain/app-user/point/app-user-point';
import { AppUserPointApplicationService } from '@application/app-user-point/app-user-point.application.service';
import { CreateOrderProductReviewDto } from '@application/order/order.application.dto';

@Injectable()
export class OrderApplicationService {
  constructor(
    private readonly appUserPointApplicationService: AppUserPointApplicationService,

    private readonly orderRepo: OrderRepo,
  ) {}

  orderProductDeliver(id: number) {
    const orderProduct = this.orderRepo.findOneProductById(id);

    if (!orderProduct) {
      throw new NotFoundException();
    }

    orderProduct.deliver();

    this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  orderProductConfirm(dto: { id: number; userId: number }) {
    const { id, userId } = dto;

    const orderProduct =
      this.orderRepo.findOneOrderProductWishOrderAndProduct(id);

    if (!orderProduct) {
      throw new NotFoundException();
    }

    if (orderProduct.order.userId !== userId) {
      throw new ForbiddenException();
    }

    orderProduct.confirm();

    this.appUserPointApplicationService.savePoint(
      userId,
      orderProduct.product.price * 0.01,
      AppUserPointHistoryAction.ORDER_PRODUCT,
      orderProduct.id,
    );

    this.orderRepo.saveProduct(orderProduct);

    return orderProduct;
  }

  createOrderProductReview(dto: CreateOrderProductReviewDto) {
    const orderProduct = this.orderRepo.findOneWishOrderProductReview(
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

    this.orderRepo.saveProductReview(orderProductReview);

    return orderProduct;
  }
}
