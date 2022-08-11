import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Answer, answer_Schema } from 'src/schema/answer.schema';
import { Issue, issue_Schema } from 'src/schema/issue.schema';
import { Stats, stats_Schema } from 'src/schema/stats.schema';
import { User, user_Schema } from 'src/schema/user.schema';
import { IssueController } from './issue.controller';

import { IssueService } from './issue.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Issue.name, schema: issue_Schema }]),
    MongooseModule.forFeature([{ name: Answer.name, schema: answer_Schema }]),
    MongooseModule.forFeature([{ name: User.name, schema: user_Schema }]),
    MongooseModule.forFeature([{ name: Stats.name, schema: stats_Schema }]),
  ],
  controllers: [IssueController],
  providers: [IssueService],
  exports: [IssueService],
})
export class IssueModule {}
