import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersRequestDto } from 'src/dto/users.request.dto';
import { usersInforDto } from 'src/dto/users.info.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signUp(@Body() body: usersRequestDto) {
    return this.usersService.signUp(body);
  }

  @Get()
  async userinfo(@Body() body: usersInforDto) {
    return this.usersService.userinfo(body);
  }
}
