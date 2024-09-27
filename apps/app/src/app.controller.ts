import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from '@common/common/decorator/public.decorator';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiOkResponse({
    example: 'Hello app!',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
