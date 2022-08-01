import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { users, userSchema } from '../users/users.schema';
import { CardController } from './card.controller';
import { CardService } from './card.service';
import { cardanswer, card_answer_Schema } from './card_answer.schema';
import { counter, counterSchema } from './counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: cardanswer.name,
        schema: card_answer_Schema,
      },
      {
        name: users.name,
        schema: userSchema,
      },
      {
        name: counter.name,
        schema: counterSchema,
      },
    ]),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
