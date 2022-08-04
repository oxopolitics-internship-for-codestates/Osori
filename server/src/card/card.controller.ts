import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CardService } from './card.service';
import { create_answerdto } from '../dto/card.create.answer.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('map/:id')
  getmap(@Param() params, @Res() response) {
    return this.cardService.getmap(params.id, response);
  }

  @Get('region/:id')
  getregion(@Param() params, @Res() response) {
    return this.cardService.getregion(params.id, response);
  }

  @Post('create_answer')
  async create_answer(@Body() body: create_answerdto) {
    return this.cardService.create_answer(body);
  }
}
