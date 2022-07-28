import { Controller, Get } from '@nestjs/common';
import { WholemapService } from './wholemap.service';

@Controller('card')
export class WholemapController {
  constructor(private readonly wholemapService: WholemapService) {}

  @Get('map/:id')
  getmap() {
    return this.wholemapService.getwholemap();
  }
}
