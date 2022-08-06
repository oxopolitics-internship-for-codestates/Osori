import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { usersRequestDto } from 'src/dto/users.request.dto';
import { usersInforDto } from 'src/dto/users.info.dto';
import { User } from 'src/schema/user.schema';
// async await 사용하지 않고 express처럼 처리할경우
//import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // 새유저 무작위 생성
  async signup() {
    return 'signup';
  }
  async userinfo(userName: string) {
    const res = this.userModel
      .findOne({ userName: userName })
      .select({ userName: 1, BirthYear: 1, gender: 1, address: 1, email: 1 });
    return res;
  }

  // async await 사용하지 않고 express처럼 처리할경우
  // userinfo(userName: string, response: Response) {
  //   this.userModel
  //     .findOne({ userName: userName })
  //     .select({ userName: 1, BirthYear: 1, gender: 1, address: 1, email: 1 })
  //     .then((res) => {
  //       response.status(200).send(res);
  //     })
  //     .catch(() => {
  //       response.status(400).send('error');
  //     });
  // }
}
