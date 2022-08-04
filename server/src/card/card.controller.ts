import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { CardService } from './card.service';
import { create_answerdto } from '../dto/card.create.answer.dto';
import { response } from 'express';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('map/:id')
  async getmap(@Param() params) {
    return this.cardService.getmap(params.id);
  }

  @Get('mapcount/:id')
  async getmapcount(@Param() params) {
    return this.cardService.getmapcount(params.id);
  }

  @Get('region/:id')
  async getregion(@Param() params) {
    return this.cardService.getregion(params.id);
  }

  @Get('map_test/:id')
  getmap_test(@Param() params, @Res() response) {
    return this.cardService.getmap_test(params.id, response);
  }

  @Post('create_answer')
  async create_answer(@Body() body: create_answerdto) {
    return this.cardService.create_answer(body);
  }
}
