import { Controller, Get, Param } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('map/:id')
  async getmapdata(@Param() params) {
    return this.statsService.getmapdata(params.id);
  }

  @Get('region/:id')
  async getregiondata(@Param() params) {
    return this.statsService.getregiondata(params.id);
  }
}
