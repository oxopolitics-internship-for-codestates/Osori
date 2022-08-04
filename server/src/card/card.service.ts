import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { create_answerdto } from '../dto/card.create.answer.dto';

import { User } from 'src/schema/user.schema';
import { Answer, answer_Schema } from 'src/schema/answer.schema';
import { Issue } from 'src/schema/issue.schema';
import { regionData, mapData } from 'src/interface/mapdata';

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

  async getregion(id: string) {
    let arr = await this.userModel
      .find({
        address: new RegExp(id),
      })
      .populate('answers', 'answer');

    return this.mk_region_data(arr, id);
  }

  async getmapcount(id: string) {
    let names: { [key: string]: string[] } = {
      전국: [
        '서울특별시',
        '부산광역시',
        '대구광역시',
        '인천광역시',
        '광주광역시',
        '대전광역시',
        '울산광역시',
        '경기도',
        '강원도',
        '충청북도',
        '충청남도',
        '전라북도',
        '전라남도',
        '경상북도',
        '경상남도',
        '제주특별자치도',
        '세종특별자치시',
      ],
      서울: [
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
      ],
    };
    let ans: mapData = { name: '', count: 0, data: {} };
    if (id === '전국') {
      ans.name = id;
      for (let i of names[id]) {
        let c = await this.userModel.countDocuments({ address: new RegExp(i) });
        ans.count += c;
        ans.data[i] = { count: c, name: i };
      }

      return ans;
    } else if (id === '서울') {
      ans.name = id;
      for (let i of names[id]) {
        let c = await this.userModel.countDocuments({
          address: new RegExp(i),
        });
        ans.count += c;
        ans.data[i] = { count: c, name: i };
      }
      return ans;
    }
  }

  async getmap(id: string) {
    if (id === '전국') {
      let arr = await this.userModel.find();

      return this.mk_map_data(arr, id);
    } else if (id === '서울') {
      let arr = await this.userModel.find({
        address: new RegExp('서울특별시'),
      });

      return this.mk_map_data(arr, '서울특별시');
    }
  }

  getmap_test(id: string, response) {
    this.userModel
      .find({
        address: new RegExp(id),
      })
      .populate('answers', 'answer')
      .then((arr) => {
        // console.log(this.mk_map_data(arr, id));
        // response.send(arr);
        response.send(this.mk_map_data(arr, id));
      });
  }
}
