import { Controller, Get, Param } from '@nestjs/common';
import { statsGetMapDto } from 'src/dto/stats.mapdata.dto';
import { statsGetRegionDto } from 'src/dto/stats.regiondata.dto';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get('map/:issueId/:mapName')
  async getmapdata(@Param() params: statsGetMapDto) {
    return this.statsService.getmapdata(params.mapName, params.issueId);
  }

  @Get('region/:issueId/:regionName')
  async getregiondata(@Param() params: statsGetRegionDto) {
    return this.statsService.getregiondata(params.regionName, params.issueId);
  }
}
