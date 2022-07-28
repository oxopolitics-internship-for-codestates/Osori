import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { usersRequestDto } from 'src/dto/users.request.dto';
import { users } from './users.schema';
import * as bcrypt from 'bcrypt';
import { formatApolloErrors } from 'apollo-server-errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(users.name) private readonly userModel: Model<users>,
  ) {}

  async signUp(body: usersRequestDto) {
    const { name, gender, age, address, password } = body;
    const isUserExist = await this.userModel.exists({ name, password });
    if (isUserExist) {
      throw new UnauthorizedException('해당 유저는 이미 존재합니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const find = await this.userModel
      .find({}, { _id: 1 })
      .sort({ _id: -1 });

    console.log('???????????????????????', find);
    const user = await this.userModel.create({
      _id:,
      name,
      gender,
      age,
      address,
      password: hashedPassword,
    });

    return user
  }
}
