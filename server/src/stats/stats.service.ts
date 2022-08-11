import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Stats } from 'src/schema/stats.schema';

@Injectable()
export class StatsService {
  constructor(
    @InjectModel(Stats.name) private readonly statsModel: Model<Stats>,
  ) {}

  async getmapdata(mapName: string, issueId: mongoose.Schema.Types.ObjectId) {
    const arr = await this.statsModel
      .find({ mapName: new RegExp(mapName), issueId: issueId })
      .select({ count: 1, regionName: 1 });

    return arr;
  }

  async getregiondata(
    regionName: string,
    issueId: mongoose.Schema.Types.ObjectId,
  ) {
    const arr = await this.statsModel.find({
      regionName: new RegExp(regionName),
      issueId: issueId,
    });
    return arr;
  }
}
