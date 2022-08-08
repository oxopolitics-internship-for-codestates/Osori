import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, answer_Schema } from 'src/schema/answer.schema';
import { Issue, issue_Schema } from 'src/schema/issue.schema';
import { Stats, stats_Schema } from 'src/schema/stats.schema';
import { User, user_Schema } from 'src/schema/user.schema';
import { CardController } from './stats.controller';
import { CardService } from './stats.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Answer.name,
        schema: answer_Schema,
      },
      {
        name: User.name,
        schema: user_Schema,
      },
      {
        name: Issue.name,
        schema: issue_Schema,
      },
      {
        name: Stats.name,
        schema: stats_Schema,
      },
    ]),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
