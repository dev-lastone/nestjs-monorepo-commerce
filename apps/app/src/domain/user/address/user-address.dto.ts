import { Address } from './address';

export interface ICreateUserAddress {
  userId: number;
  isDefault: boolean;
  address: Address;
}
