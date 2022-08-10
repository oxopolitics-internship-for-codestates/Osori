import { Controller, Get, Param } from '@nestjs/common';
import { userInfoDto } from 'src/dto/user.userinfo.dto';
import { UsersService } from './users.service';
// async await 사용하지 않고 express처럼 처리할경우
// import { Response } from 'express';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async signUp() {
    return this.usersService.signUp();
  }

  @Get(':userName')
  async userinfo(@Param() params: userInfoDto) {
    return this.usersService.userInfo(params.userName);
  }
  // async await 사용하지 않고 express처럼 처리할경우
  // @Get(':userName')
  // userinfo(@Param() { userName }, @Res() response: Response) {
  //   return this.usersService.userinfo(userName, response);
  // }
}
