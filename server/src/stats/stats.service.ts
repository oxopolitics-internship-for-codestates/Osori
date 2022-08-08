import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stats } from 'src/schema/stats.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Stats.name) private readonly statsModel: Model<Stats>,
  ) {}

  async getmapdata(id: string) {
    const arr = await this.statsModel
      .find({ mapName: new RegExp(id) })
      .select({ count: 1, regionName: 1 });

    return arr;
  }

  async getregiondata(id: string) {
    const arr = await this.statsModel.find({ regionName: new RegExp(id) });
    return arr;
  }
}
