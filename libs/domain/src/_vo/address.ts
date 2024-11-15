import {
  IsNotEmpty,
  IsPostalCode,
  IsString,
  validateOrReject,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class Address {
  @ApiProperty({
    example: '01234',
  })
  @IsNotEmpty()
  @IsPostalCode('KR')
  @Column({ name: 'zipcode', type: 'varchar', length: '5' })
  zipcode: string;

  @ApiProperty({
    example: '서울시 강남구 역삼동 *********',
  })
  @IsNotEmpty()
  @IsString()
  @Column({ name: 'address', type: 'varchar', length: '100' })
  address: string;

  static create(dto: { zipcode: string; address: string }) {
    const address = new Address();
    address.zipcode = dto.zipcode;
    address.address = dto.address;

    this.validate();

    return address;
  }

  static async validate() {
    await validateOrReject(this);
  }
}
