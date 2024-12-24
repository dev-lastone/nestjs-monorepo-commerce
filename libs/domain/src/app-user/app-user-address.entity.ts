import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppUser } from '@domain/app-user/app-user.entity';
import { Address } from '@domain/_vo/address';
import { MyBaseEntity } from '@common/entity/my-base-entity';
import { dtoToInstance } from '@common/util/dto-to-instance';
import { IsBigInt } from 'class-validator-extended';

@Entity('user_address', { schema: 'app' })
export class AppUserAddress extends MyBaseEntity {
  @IsNotEmpty()
  @IsBigInt()
  @ApiProperty({
    example: 1,
  })
  @Column({ name: 'user_id', type: 'bigint' })
  userId: bigint;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  @Column({ name: 'is_default', type: 'boolean' })
  isDefault: boolean;

  @ApiProperty()
  @Column(() => Address)
  address: Address;

  @ManyToOne(() => AppUser, (user) => user.addresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: AppUser;

  static create(dto: { userId: bigint; isDefault: boolean; address: Address }) {
    return dtoToInstance({ class: AppUserAddress, dto });
  }
}
