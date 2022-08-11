import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Issue } from 'src/schema/issue.schema';
import { issueCreateDto } from 'src/dto/issue.create.dto';
import { issueAnswerDto } from 'src/dto/issue.select.answer.dto';
import { Answer } from 'src/schema/answer.schema';
import { User } from 'src/schema/user.schema';
import { Stats } from 'src/schema/stats.schema';
import { issueInfoDto } from 'src/dto/issue.info.dto';

@Injectable()
export class IssueService {
  constructor(
    @InjectModel(Issue.name) private readonly issueModel: Model<Issue>,
    @InjectModel(Answer.name) private readonly answerModel: Model<Answer>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Stats.name) private readonly statsModel: Model<Stats>,
  ) {}

  async countData(issue: Issue, user: User, answer: Answer) {
    const { birthYear, address, gender } = user;
    const nanswer = answer.answer;
    const addNames = address.split(' ');
    const today = new Date().getFullYear();
    let mapName = '',
      regionName = '';

    if (addNames.length > 1) {
      [mapName, regionName] = addNames;
    } else {
      [mapName, regionName] = ['전국', addNames[0]];
    }
    let region = await this.statsModel.findOne({
      issueId: issue._id,
      regionName: regionName,
    });
    if (region === null) {
      region = await new this.statsModel({
        issueId: issue._id,
        mapName: mapName,
        regionName: regionName,
      });
      region = await region.save();
    }
    region.count++;

    const age =
      (Math.floor((today - birthYear + 1) / 10) * 10).toString() + '대';
    if (gender === '남') {
      region.male.count++;
      if (nanswer === '네') {
        region.male.yes++;
      } else if (nanswer === '아니요') {
        region.male.no++;
      } else {
        region.male.so++;
      }

      if (age === '10대') {
        region.male.age['10대']++;
      } else if (age === '20대') {
        region.male.age['20대']++;
      } else if (age === '30대') {
        region.male.age['30대']++;
      } else if (age === '40대') {
        region.male.age['40대']++;
      } else if (age === '50대') {
        region.male.age['50대']++;
      } else {
        region.male.age['60대이상']++;
      }
    } else {
      region.female.count++;
      if (nanswer === '네') {
        region.female.yes++;
      } else if (nanswer === '아니요') {
        region.female.no++;
      } else {
        region.female.so++;
      }
      if (age === '10대') {
        region.female.age['10대']++;
      } else if (age === '20대') {
        region.female.age['20대']++;
      } else if (age === '30대') {
        region.female.age['30대']++;
      } else if (age === '40대') {
        region.female.age['40대']++;
      } else if (age === '50대') {
        region.female.age['50대']++;
      } else {
        region.female.age['60대이상']++;
      }
    }
    region = await region.save();
    let map = await this.statsModel.findOne({
      issueId: issue._id,
      regionName: mapName,
    });

    if (map === null) {
      map = await new this.statsModel({
        issueId: issue._id,
        mapName: mapName === '전국' ? '지구' : '전국',
        regionName: mapName,
      });
      map = await map.save();
    }

    map.count++;
    if (gender === '남') {
      map.male.count++;
      if (nanswer === '네') {
        map.male.yes++;
      } else if (nanswer === '아니요') {
        map.male.no++;
      } else {
        map.male.so++;
      }
      if (age === '10대') {
        map.male.age['10대']++;
      } else if (age === '20대') {
        map.male.age['20대']++;
      } else if (age === '30대') {
        map.male.age['30대']++;
      } else if (age === '40대') {
        map.male.age['40대']++;
      } else if (age === '50대') {
        map.male.age['50대']++;
      } else {
        map.male.age['60대이상']++;
      }
    } else {
      map.female.count++;
      if (nanswer === '네') {
        map.female.yes++;
      } else if (nanswer === '아니요') {
        map.female.no++;
      } else {
        map.female.so++;
      }
      if (age === '10대') {
        map.female.age['10대']++;
      } else if (age === '20대') {
        map.female.age['20대']++;
      } else if (age === '30대') {
        map.female.age['30대']++;
      } else if (age === '40대') {
        map.female.age['40대']++;
      } else if (age === '50대') {
        map.female.age['50대']++;
      } else {
        map.female.age['60대이상']++;
      }
    }
    map = await map.save();
  }

  async createIssue(body: issueCreateDto) {
    let issue = new this.issueModel({ ...body, user: body.userId });
    const user = await this.userModel.findOne({ _id: body.userId });
    await this.userModel.updateOne({ issues: [...user.issues, issue._id] });
    issue = await issue.save();

    const a = [
      '서울특별시',
      '부산광역시',
      '대구광역시',
      '인천광역시',
      '광주광역시',
      '대전광역시',
      '울산광역시',
      '세종특별자치시',
      '경기도',
      '강원도',
      '충청북도',
      '충청남도',
      '전라북도',
      '전라남도',
      '경상북도',
      '경상남도',
      '제주특별자치도',
    ];
    const b = [
      '종로구',
      '중구',
      '용산구',
      '성동구',
      '광진구',
      '동대문구',
      '중랑구',
      '성북구',
      '강북구',
      '도봉구',
      '노원구',
      '은평구',
      '서대문구',
      '마포구',
      '양천구',
      '강서구',
      '구로구',
      '금천구',
      '영등포구',
      '동작구',
      '관악구',
      '서초구',
      '강남구',
      '송파구',
      '강동구',
    ];

    let map = '전국';

    const region = await new this.statsModel({
      issueId: issue._id,
      mapName: '지구',
      regionName: '전국',
    });
    await region.save();

    for (const regionName of a) {
      const region = await new this.statsModel({
        issueId: issue._id,
        mapName: map,
        regionName: regionName,
      });
      await region.save();
    }
    map = '서울특별시';
    for (const regionName of b) {
      const region = await new this.statsModel({
        issueId: issue._id,
        mapName: map,
        regionName: regionName,
      });
      await region.save();
    }

    return issue !== null;
  }

  async selectAnswer(body: issueAnswerDto) {
    let answer = await this.answerModel.findOne({
      user: body.userId,
      issue: body.issueId,
    });
    if (answer === null) {
      answer = new this.answerModel({
        ...body,
        issue: body.issueId,
        user: body.userId,
      });
      answer = await answer.save();
      const issue = await this.issueModel.findOne({ _id: body.issueId });
      await issue.updateOne({ answers: [...issue.answers, answer._id] });
      const user = await this.userModel.findOne({ _id: body.userId });
      await user.updateOne({ answers: [...user.answers, answer._id] });
      this.countData(issue, user, answer);
    } else {
      answer = null;
    }
    return answer !== null;
  }

  async issueinfo(userId: issueInfoDto) {
    if (userId) {
      const res = await this.issueModel
        .find()
        .select({ answers: 0 })
        .sort({ createdAt: -1 });
      const data = [];
      for (const { _id, title, answerTextO, answerTextS, answerTextX } of res) {
        const answer = await this.answerModel.findOne({
          issue: _id,
          user: userId,
        });
        data.push({
          _id,
          title,
          answerTextO,
          answerTextS,
          answerTextX,
          answer: answer ? answer.answer : undefined,
        });
      }

      return data;
    } else {
      const res = await this.issueModel
        .find()
        .select({ answers: 0 })
        .sort({ createdAt: -1 });
      return res;
    }
  }
}
