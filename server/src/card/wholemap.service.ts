import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { users } from '../users/users.schema';

@Injectable()
export class WholemapService {
  constructor(
    @InjectModel(users.name) private readonly userModel: Model<users>,
  ) {}

  async getwholemap() {
    const isUserexist = await this.userModel.find();
    console.log(isUserexist)
    return isUserexist;
  }
}
