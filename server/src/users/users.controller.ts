import { Controller, Get, Param } from '@nestjs/common';
import { userInfoDto } from 'src/dto/user.userinfo.dto';
import { UsersService } from './users.service';

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
}
