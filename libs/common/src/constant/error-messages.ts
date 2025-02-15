import { USER_ADDRESS_MAX_LENGTH } from '@common/constant/constants';

export const ERROR_MESSAGES = {
  ProductNotFound: 'Product not found',
  UserAddressNotFound: 'User address not found',
  UserAddressMaxLength: 'User address max length is ' + USER_ADDRESS_MAX_LENGTH,
  UserAddressDefaultRequired: 'Please set the default address.',
  UserCartNotFound: 'User cart not found',
  PasswordConfirm: 'Please check the password.',
  NotEnoughPoints: 'Not enough points.',
  AlreadyBeenDelivered: 'Already been delivered.',
  NotOnDeliveryStatus: 'Not on delivery status.',
  NotDeliveryStatus: 'Not delivery status.',
  NotConfirmStatus: 'Not confirm status.',
  AlreadyReviewed: 'Already reviewed.',
  InvalidSignIn: 'Invalid email or password',
  ProductAlreadyLiked: 'Product already liked',
  ProductNotLiked: 'Product not liked',
  DuplicateEmail: 'Email already exists',
  NotEnoughStock: 'Not enough stock',
};
