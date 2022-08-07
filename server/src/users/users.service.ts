import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import randomPick from '../../etc/randomPick';
// async await 사용하지 않고 express처럼 처리할경우
//import { Response } from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // 새유저 무작위 생성
  async signup() {
    const newData = randomPick(1, 0);
    let userData = new this.userModel({ ...newData[0] });
    userData = await userData.save();
    return { _id: userData._id, userName: userData.userName };
  }
  async userinfo(userName: string) {
    const res = await this.userModel
      .findOne({ userName: userName })
      .select({ userName: 1, birthYear: 1, gender: 1, address: 1, email: 1 });
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
