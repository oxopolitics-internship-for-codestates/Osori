import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { create_answerdto } from '../dto/card.create.answer.dto';

import { User } from 'src/schema/user.schema';
import { Answer } from 'src/schema/answer.schema';
import { Issue } from 'src/schema/issue.schema';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Answer.name)
    private readonly answerModel: Model<Answer>,
    @InjectModel(Issue.name) private readonly issueModel: Model<Issue>,
  ) {}

  async create_map_name() {
    // const city_all = [
    //   '서울특별시',
    //   '경기도',
    //   '인천광역시',
    //   '세종특별자치시',
    //   '충청북도',
    //   '대전광역시',
    //   '충청남도',
    //   '광주광역시',
    //   '제주특별자치도',
    //   '전라남도',
    //   '전라북도',
    //   '경상남도',
    //   '부산광역시',
    //   '울산광역시',
    //   '대구광역시',
    //   '경상북도',
    //   '강원도',
    // ];
    // const city_name_all = [
    //   'seoul',
    //   'kyunggido',
    //   'incheon',
    //   'sejong',
    //   'chungchongbuk_do',
    //   'daejeon',
    //   'chungchongnam_do',
    //   'gwangju',
    //   'jeju',
    //   'jeollanam_do',
    //   'jeollabuk_do',
    //   'kyungsannam_do',
    //   'busan',
    //   'ulsan',
    //   'daegu',
    //   'kyungsanbuk_do',
    //   'gangwon_do',
    // ];
    // const target_map = await Promise.all(
    //   city_all.map(async (el) => {
    //     return await this.userModel.find({
    //       answer: { $exists: true },
    //       'address.city_name': { $regex: el },
    //     });
    //   }),
    // );
    // console.log(target_map);
    // // console.log(target_map_answer)
    // // target_map_answer
    // return;
  }
  //각 전체 지도를 도시로 나눠주는 함수

  async reserch_birthDate(array) {
    // let count = 0;
    // const birthDate = await array.map((el) => {
    //   const re = el.age.split(' ');
    //   return new Date(Number(re[0]), Number(re[1]), Number(re[2]));
    // });
    // birthDate.map((el) => {
    //   const day_cal = new Date().getFullYear() - el.getFullYear() + 1;
    //   day_cal >= 19 ? count++ : count;
    // });
    // return count;
  }
  // 투표가능한 나이 걸러주는 함수

  async reserch_answer(gender: string, answer: string) {
    // const age_array = await this.userModel.find(
    //   gender === undefined || answer === undefined
    //     ? { answer: { $exists: true } }
    //     : { gender: gender, answer: answer },
    // );
    // return await this.reserch_birthDate(age_array);
  }
  // 각 응답에 대한 전체 성별 및 투표가능 나이 찾는 함수

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
  // 완료 된다
  async getregion(id: string) {
    const arr = await this.userModel
      .findOne({
        address: new RegExp(id),
      })
      .populate('answers');

    return arr;
  }

  async getwholemap() {
    // const all_count = await this.reserch_answer(undefined, undefined);
    // const male_answer_po = await this.reserch_answer('m', 'o');
    // const male_answer_na = await this.reserch_answer('m', 'x');
    // const male_answer_ne = await this.reserch_answer('m', 'n');
    // const female_answer_po = await this.reserch_answer('f', 'o');
    // const female_answer_na = await this.reserch_answer('f', 'x');
    // const female_answer_ne = await this.reserch_answer('f', 'n');
    // const all_answer_po = (
    //   ((male_answer_po + female_answer_po) / all_count) *
    //   100
    // ).toFixed();
    // const all_answer_na = (
    //   ((male_answer_ne + female_answer_ne) / all_count) *
    //   100
    // ).toFixed();
    // const all_answer_ne = (
    //   ((male_answer_na + female_answer_na) / all_count) *
    //   100
    // ).toFixed();
    // const result = {
    //   all_count: all_count,
    //   all_response_rate_po: all_answer_po,
    //   all_response_rate_na: all_answer_na,
    //   all_response_rate_nu: all_answer_ne,
    //   male_count_all: male_answer_na + male_answer_na + male_answer_ne,
    //   male_count_po: male_answer_po,
    //   male_count_na: male_answer_na,
    //   male_count_nu: male_answer_ne,
    //   female_count_all: female_answer_po + female_answer_na + female_answer_ne,
    //   female_count_po: female_answer_po,
    //   female_count_na: female_answer_na,
    //   female_count_nu: female_answer_ne,
    // };
    // const each_city = await this.create_map_name();
    // each_city.filter(el => el.length > 0);
    // await each_city.map((el) => {
    //   console.log(el)
    // })
    // await each_city['kyunggido'].filter(el => el.answer !== undefined);
    // reserch_birthDate()
    //return result;
  }
}
