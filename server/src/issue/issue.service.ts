import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Issue } from 'src/schema/issue.schema';
import { issueCreateDto } from 'src/dto/issue.create.dto';
import { issueAnswerDto } from 'src/dto/issue.select.answer.dto';
import { Answer } from 'src/schema/answer.schema';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name) private readonly issueModel: Model<Issue>,
    @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
  ) {}

  async createIssue(body: issueCreateDto) {
    let issue = new this.issueModel({ ...body });
    issue = await issue.save();
    return issue._id !== null;
  }

  async selectAnswer(body: issueAnswerDto) {
    let answer = new this.answerModel({ ...body });
    answer = await answer.save();
    // 이슈 아이디와 유저아이디만으로 새로운 answerid를 answers 에 추가할 방법을 찾아보기

    // await Issue.updateOne(
    //   { _id: issue_id },
    //   { answers: [...issue.answers, ans_id] },
    // );
    // await User.updateOne(
    //   { _id: user_id },
    //   { answers: [ans_id], Issues: [issue_id] },
    // );

    return answer;
  }

  async issueinfo() {
    const res = await this.issueModel.find().select({ answers: 0 });
    return res;
  }
}
