import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersRequestDto } from 'src/dto/users.request.dto';
import { usersInforDto } from 'src/dto/users.info.dto';
// async await 사용하지 않고 express처럼 처리할경우
// import { Response } from 'express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Post()
  // async signUp(@Body() body: usersRequestDto) {
  //   return this.usersService.signUp(body);
  // }

  @Get(':userName')
  userinfo(@Param() { userName }) {
    return this.usersService.userinfo(userName);
  }
  // async await 사용하지 않고 express처럼 처리할경우
  // @Get(':userName')
  // userinfo(@Param() { userName }, @Res() response: Response) {
  //   return this.usersService.userinfo(userName, response);
  // }
}
