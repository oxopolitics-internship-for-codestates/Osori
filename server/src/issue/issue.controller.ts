import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { IssueService } from './issue.service';
import { issueCreateDto } from 'src/dto/issue.create.dto';

@Controller('issue')
export class IssueController {
  constructor(private readonly issueService: IssueService) {}

  @Post()
  async createIssue(@Body() body: issueCreateDto) {
    return this.issueService.createIssue(body);
  }
  @Post()
  async selectAnswer(@Body() body) {
    return this.issueService.createIssue(body);
  }
  @Get()
  async issueinfo() {
    return this.issueService.issueinfo();
  }
}
