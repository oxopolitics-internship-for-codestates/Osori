import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { usersRequestDto } from 'src/dto/users.request.dto';
import { users } from './users.schema';
import * as bcrypt from 'bcrypt';

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
    const find = await this.userModel.find().count();
    const age_array = age.split(' ');
    const today = new Date();
    const birtDate = new Date(
      Number(age_array[0]),
      Number(age_array[1]),
      Number(age_array[2]),
    );

    const age_cal = today.getFullYear() - birtDate.getFullYear() + 1;

    const user = await this.userModel.create({
      _id: find,
      name,
      gender,
      age: age_cal,
      address,
      password: hashedPassword,
    });

    return user;
  }
}
