import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Public } from '@common/decorator/public.decorator';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Get()
  @ApiOkResponse({
    example: 'Hello admin!',
  })
  getHello(): string {
    return this.adminService.getHello();
  }
}
