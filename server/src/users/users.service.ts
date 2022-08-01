import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { usersRequestDto } from 'src/dto/users.request.dto';
import { usersInforDto } from 'src/dto/users.info.dto';
import { users } from './users.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(users.name) private readonly userModel: Model<users>,
  ) {}

  async signUp(body: usersRequestDto) {
    const { name, gender, age, address, email, answer } = body;
    const is_user_exist = await this.userModel.find({ email: email });
    if (is_user_exist.length !== 0) {
      throw new UnauthorizedException('해당 유저는 이미 존재합니다.');
    }
    const city_divide = address.split(' ')[0];
    const region_divide = address.split(' ')[1];
    await this.userModel.create({
      email,
      name,
      gender,
      age,
      answer,
      address: {
        city_name: city_divide,
        region_name: region_divide,
      },
    });

    return 'create done';
  }

  async userinfo(body: usersInforDto) {
    const { email } = body;
    const find_user = await this.userModel.find({ email: email });

    if (find_user.length === 0) {
      throw new UnauthorizedException('해당 유저가 존재하지 않습니다.');
    }

    const info = find_user.slice();
    const info_array = info[0];
    const age_array = info_array.age.split(' ');
    const today = new Date();
    const birthDate = new Date(
      Number(age_array[0]),
      Number(age_array[1]),
      Number(age_array[2]),
    );

    const age_cal = today.getFullYear() - birthDate.getFullYear() + 1;
    // 나이계산 연산자
    info_array.age = String(age_cal);
    info_array.address[0] = `${info_array.address[0]['city_name']} ${info_array.address[0]['region_name']}`;
    return info_array;
  }
}
