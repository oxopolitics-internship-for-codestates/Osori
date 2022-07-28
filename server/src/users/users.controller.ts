import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersRequestDto } from 'src/dto/users.request.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signUp(@Body() body: usersRequestDto) {
    return this.usersService.signUp(body);
  }
}
