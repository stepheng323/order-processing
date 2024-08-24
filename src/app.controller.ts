import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello() {
    return {
      status: true,
      message: 'Welcome to food court',
    };
  }
}
