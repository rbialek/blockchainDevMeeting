import { Get, Controller, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async root() {
    return await this.appService.root();
  }

  @Get('/t1/:n')
  async t1(@Param('n') n: number) {
    return await this.appService.task1(n);
  }

  @Get('/t2/:n')
  async t2(@Param('n') n: number) {
    return await this.appService.task2(n);
  }

}
