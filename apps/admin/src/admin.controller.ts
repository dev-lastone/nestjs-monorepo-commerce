import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Public } from '@common/common/decorator/public.decorator';

@Controller()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Public()
  @Get()
  getHello(): string {
    return this.adminService.getHello();
  }
}
