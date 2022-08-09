import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('map/:mapName')
  async getmapdata(@Param() params) {
    return this.statsService.getmapdata(params.mapName);
  }

  @Get('region/:regionName')
  async getregiondata(@Param() params) {
    return this.statsService.getregiondata(params.regionName);
  }
}
