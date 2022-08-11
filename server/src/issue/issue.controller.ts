import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IssueService } from './issue.service';
import { issueCreateDto } from 'src/dto/issue.create.dto';
import { issueAnswerDto } from 'src/dto/issue.select.answer.dto';
import { issueInfoDto } from 'src/dto/issue.info.dto';

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post()
  async createIssue(@Body() body: issueCreateDto) {
    return this.issueService.createIssue(body);
  }
  @Post('answer')
  async selectAnswer(@Body() body: issueAnswerDto) {
    return this.issueService.selectAnswer(body);
  }
  @Get()
  async issueinfot() {
    return this.issueService.issueinfo(undefined);
  }
  @Get(':userId')
  async issueinfo(@Param() { userId }: { userId: issueInfoDto }) {
    return this.issueService.issueinfo(userId);
  }
}
