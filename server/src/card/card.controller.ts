import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CardService } from './card.service';
import { create_answerdto } from '../dto/card.create.answer.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('map')
  async getmap() {
    return this.cardService.getwholemap();
  }

  @Get(':id')
  async getregion(@Param() params) {
    return this.cardService.getregion(params.id);
  }

  @Post('create_answer')
  async create_answer(@Body() body: create_answerdto) {
    return this.cardService.create_answer(body);
  }
}
