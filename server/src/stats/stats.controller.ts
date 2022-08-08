import { Controller, Get, Param } from '@nestjs/common';
import { CardService } from './stats.service';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('map/:id')
  async getmapdata(@Param() params) {
    return this.cardService.getmapdata(params.id);
  }

  @Get('region/:id')
  async getregiondata(@Param() params) {
    return this.cardService.getregiondata(params.id);
  }
}
