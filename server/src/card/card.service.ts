import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { create_answerdto } from '../dto/card.create.answer.dto';

import { User } from 'src/schema/user.schema';
import { Answer, answer_Schema } from 'src/schema/answer.schema';
import { Issue } from 'src/schema/issue.schema';
import { regionData, mapData } from 'src/interface/subdata';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Answer.name)
    private readonly answerModel: Model<Answer>,
    @InjectModel(Issue.name) private readonly issueModel: Model<Issue>,
  ) {}

  mk_region_data(data, region) {
    let sdata: regionData = {
        name: region,
        count: 0,
        male: { count: 0, answer: { yes: 0, no: 0, so: 0 }, age: { count: 0 } },
        female: {
          count: 0,
          answer: { yes: 0, no: 0, so: 0 },
          age: { count: 0 },
        },
      },
      n = data.length;

    for (let i = 0; i < n; i++) {
      let { gender, age, answers } = data[i];
      let { answer } = answers[0];

      sdata.count++;
      if (gender === '남') {
        sdata.male.count++;
        if (answer === '네') {
          sdata.male.answer.yes++;
        } else if (answer === '글세요') {
          sdata.male.answer.so++;
        } else {
          sdata.male.answer.no++;
        }
        sdata.male.age.count++;
        if (sdata.male.age[age] === undefined) {
          sdata.male.age[age] = 0;
        }
        sdata.male.age[age]++;
      } else {
        sdata.female.count++;
        if (answer === '네') {
          sdata.female.answer.yes++;
        } else if (answer === '글세요') {
          sdata.female.answer.so++;
        } else {
          sdata.female.answer.no++;
        }
        sdata.female.age.count++;
        if (sdata.female.age[age] === undefined) {
          sdata.female.age[age] = 0;
        }
        sdata.female.age[age]++;
      }
    }
    return sdata;
  }

  mk_map_data(data, map) {
    let sdata: mapData = {
        name: map,
        count: 0,
        data: {},
      },
      n = data.length;

    for (let i = 0; i < n; i++) {
      let { address } = data[i];

      let adr =
        map === '서울특별시' ? address.split(' ')[1] : address.split(' ')[0];
      sdata.count++;
      if (sdata.data[adr] === undefined) {
        sdata.data[adr] = {
          name: adr,
          count: 0,
        };
      }
      sdata.data[adr].count++;
    }
    return sdata;
  }

  async getNextSequence() {
    // const ret = await this.counterModel.findOneAndUpdate(
    //   {},
    //   { $inc: { seq: 1 } },
    //   { returnOriginal: false },
    // );
    // console.log(ret);
    // return ret.seq;
  }

  async create_answer(body: create_answerdto) {
    // const { email, answer } = body;
    // const find_exist = await this.card_answerModel.find({ email: email });
    // if (find_exist.length === 0) {
    //   const id = await this.getNextSequence();
    //   await this.card_answerModel.create({
    //     _id: id,
    //     email: email,
    //     answer: answer,
    //   });
    //   await this.userModel.updateMany(
    //     { email: email },
    //     { $addToSet: { card_answer_id: 2 } },
    //   );
    // } else {
    //   await this.card_answerModel.findOneAndUpdate(
    //     {
    //       email: email,
    //     },
    //     { $set: { answer: answer } },
    //   );
    // }
  }

  getregion(id: string, response) {
    this.userModel
      .find({
        address: new RegExp(id),
      })
      .populate('answers', 'answer')
      .then((arr) => {
        response.send(this.mk_region_data(arr, id));
      });
  }

  getmap(id: string, response) {
    this.userModel
      .find({
        address: new RegExp(id),
      })
      .populate('answers', 'answer')
      .then((arr) => {
        response.send(this.mk_map_data(arr, id));
      });
  }
}
