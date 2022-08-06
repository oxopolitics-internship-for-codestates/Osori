import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { usersRequestDto } from 'src/dto/users.request.dto';
import { usersInforDto } from 'src/dto/users.info.dto';

import { Issue } from 'src/schema/issue.schema';
import { issueCreateDto } from 'src/dto/issue.create.dto';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name) private readonly issueModel: Model<Issue>,
  ) {}

  async createIssue(body: issueCreateDto) {
    return body;
  }

  async selectAnswer(body) {
    return body;
  }

  async issueinfo() {
    const res = await this.issueModel.find();
    return res;
  }
}
