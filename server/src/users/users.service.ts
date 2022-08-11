import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import randomPick from '../../etc/randomPick';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async signUp() {
    const k = await this.userModel.countDocuments();
    const newData = randomPick(k + 1, k);
    let userData = new this.userModel({ ...newData[0] });
    userData = await userData.save();
    return { _id: userData._id, userName: userData.userName };
  }
  async userInfo(userName: string) {
    const res = await this.userModel
      .findOne({ userName: userName })
      .select({ userName: 1, birthYear: 1, gender: 1, address: 1, email: 1 });
    return res;
  }
}
