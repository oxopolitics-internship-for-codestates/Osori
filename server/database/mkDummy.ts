import * as dotenv from 'dotenv';
dotenv.config();
import randomPick from '../etc/randomPick';
import mongoose, { Schema, model } from 'mongoose';
// 1. Create an interface representing a document in MongoDB.
interface User {
  userName: string;
  //   nickName: string;
  email: string;
  address: string;
  gender: string;
  birthYear: number;
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Answer';
    },
  ];
  issues: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Issue';
    },
  ];
}

interface Issue {
  title: string;
  answerTextO: string;
  answerTextX: string;
  answerTextS: string;
  answers: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Answer';
    },
  ];
  user: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'User';
  };
}
interface Answer {
  answer: string;
  user: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'User';
  };
  issue: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'Issue';
  };
}

interface Stats {
  issueId: mongoose.Schema.Types.ObjectId;
  mapName: string;
  regionName: string;
  count: number;
  male: {
    count: number;
    yes: number;
    no: number;
    so: number;
    age: {
      '10대': number;
      '20대': number;
      '30대': number;
      '40대': number;
      '50대': number;
      '60대이상': number;
    };
  };
  female: {
    count: number;
    yes: number;
    no: number;
    so: number;
    age: {
      '10대': number;
      '20대': number;
      '30대': number;
      '40대': number;
      '50대': number;
      '60대이상': number;
    };
  };
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>(
  {
    userName: { type: String, required: true },
    //   nickName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, required: true },
    birthYear: { type: Number, required: true },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
      },
    ],
    issues: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue',
      },
    ],
  },
  { timestamps: true },
);

const issueSchema = new Schema<Issue>(
  {
    title: { type: String, required: true },
    answerTextO: { type: String, required: true },
    answerTextX: { type: String, required: true },
    answerTextS: { type: String, required: true },
    answers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);
const answerSchema = new Schema<Answer>(
  {
    answer: { type: String, required: true },
    issue: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Issue',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const StatsSchema = new Schema<Stats>(
  {
    issueId: { type: mongoose.Schema.Types.ObjectId, required: true },
    mapName: { type: String, required: true },
    regionName: { type: String, required: true },
    count: { type: Number, required: true, default: 0 },
    male: {
      count: { type: Number, required: true, default: 0 },
      yes: { type: Number, required: true, default: 0 },
      no: { type: Number, required: true, default: 0 },
      so: { type: Number, required: true, default: 0 },
      age: {
        '10대': { type: Number, required: true, default: 0 },
        '20대': { type: Number, required: true, default: 0 },
        '30대': { type: Number, required: true, default: 0 },
        '40대': { type: Number, required: true, default: 0 },
        '50대': { type: Number, required: true, default: 0 },
        '60대이상': { type: Number, required: true, default: 0 },
      },
    },
    female: {
      count: { type: Number, required: true, default: 0 },
      yes: { type: Number, required: true, default: 0 },
      no: { type: Number, required: true, default: 0 },
      so: { type: Number, required: true, default: 0 },
      age: {
        '10대': { type: Number, required: true, default: 0 },
        '20대': { type: Number, required: true, default: 0 },
        '30대': { type: Number, required: true, default: 0 },
        '40대': { type: Number, required: true, default: 0 },
        '50대': { type: Number, required: true, default: 0 },
        '60대이상': { type: Number, required: true, default: 0 },
      },
    },
  },
  { timestamps: true },
);

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.MONGODB_DUMMY_DBNAME,
});

// 3. Create a Model.
const User = model<User>('User', userSchema);
const Issue = model<Issue>('Issue', issueSchema);
const Answer = model<Answer>('Answer', answerSchema);
const Stats = model<Stats>('Stats', StatsSchema);
const today = new Date().getFullYear();
interface dataForm {
  userName: string;
  birthYear: number;
  email: string;
  address: string;
  answer: string;
  gender: string;
}

async function test(
  issued: {
    title: string;
    answerTextO: string;
    answerTextX: string;
    answerTextS: string;
  },
  data: dataForm[],
) {
  for (const { userName, birthYear, email, address, answer, gender } of data) {
    const k = Math.random();
    if (k > 0.3) {
      const issue = await Issue.findOne({ title: issued.title });
      if (issue !== null) {
        const issue_id = issue._id;

        const user = await User.findOne({ userName: userName });

        if (user !== null) {
          const user_id = user._id;

          const ans = new Answer({
            answer: answer,
            user: user_id,
            issue: issue_id,
          });
          await ans.save();

          if (ans !== null) {
            const ans_id = ans._id;

            await Issue.updateOne(
              { _id: issue_id },
              { answers: [...issue.answers, ans_id] },
            );
            await User.updateOne({ _id: user_id }, { answers: [ans_id] });

            const addNames = address.split(' ');
            let mapName = '',
              regionName = '';

            if (addNames.length > 1) {
              [mapName, regionName] = addNames;
            } else {
              [mapName, regionName] = ['전국', addNames[0]];
            }
            let region = await Stats.findOne({
              issueId: issue_id,
              regionName: regionName,
            });
            if (region === null) {
              region = await new Stats({
                issueId: issue_id,
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
              if (answer === '네') {
                region.male.yes++;
              } else if (answer === '아니요') {
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
              if (answer === '네') {
                region.female.yes++;
              } else if (answer === '아니요') {
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
            let map = await Stats.findOne({
              issueId: issue_id,
              regionName: mapName,
            });
            if (map === null) {
              map = await new Stats({
                issueId: issue_id,
                mapName: mapName === '전국' ? '지구' : '전국',
                regionName: mapName,
              });
              map = await map.save();
            }
            map.count++;
            if (gender === '남') {
              map.male.count++;
              if (answer === '네') {
                map.male.yes++;
              } else if (answer === '아니요') {
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
              if (answer === '네') {
                map.female.yes++;
              } else if (answer === '아니요') {
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
        }
      }
    }
  }
}

async function Run() {
  const issueLibrary = [
    {
      title: '서울시 집중호우 대비 어떻게 생각하세요?',
      answerTextO: '대비는 할 만큼 했어요.',
      answerTextS: '대비를 잘 했는지 모르겠어요.',
      answerTextX: '줄어든 예산! 미흡했어요.',
    },
    {
      title: '외국어 고등학교 폐지 찬성하세요',
      answerTextO: '외국어 고등하고 폐지해야 되요.',
      answerTextS: '잘 모르겠어요.',
      answerTextX: '외국어 고등학교 폐지하면 안 돼요.',
    },
    {
      title: '청와대로의 회귀, 어떻게 생각하세요?',
      answerTextO: '청와대 회귀돼야 해요.',
      answerTextS: '잘 모르겠어요.',
      answerTextX: '청와대 회기 하면 안 돼요.',
    },
    {
      title: '여러분들은 학제 개편이 필요하다고 생각하시나요?',
      answerTextO: '학재 개편 필요합니다.',
      answerTextS: '잘 모르겠어요.',
      answerTextX: '대학 진학률을 낮춰야 합니다.',
    },
    {
      title: '한국인의 양심은 특별하다고 생각하세요? (feat. K-양심)',
      answerTextO: '네! 빈자리 귀중품, 빈 집 택배 손 대지 않아요.',
      answerTextS: '잘 모르겠어요.',
      answerTextX: '아뇨! 자전거 없어지는 거 보면 그렇지도 않죠.',
    },
  ];
  let startNumber = 1;
  if (process.env.MONGODB_DUMMY_TYPE === 'new') {
    await Issue.collection.drop();
    await User.collection.drop();
    await Answer.collection.drop();
    await Stats.collection.drop();
    const editer = new User({
      userName: 'editer',
      birthYear: 1985,
      email: 'editer@gmail.com',
      address: '경기도',
      gender: '남',
    });
    await editer.save();
  } else if (process.env.MONGODB_DUMMY_TYPE === 'update') {
    startNumber = await User.countDocuments();
  }

  const dataNumber = Number(process.env.DUMMYDATANUMER) || 10;

  // 이슈 생성
  const issueCount = await Issue.countDocuments();
  if (issueCount === 0) {
    const editer = await User.findOne({ userName: 'editer' });
    const data = issueLibrary.map((x) => {
      x['user'] = editer._id;
      return x;
    });
    await Issue.insertMany(data);
  }

  // 유저 생성
  if (startNumber < dataNumber) {
    const data = randomPick(dataNumber, startNumber);
    console.log(data.length);
    await User.insertMany(data);

    //이슈별 응답 데이터 생성
    for (const issue of issueLibrary) {
      await test(issue, data);
    }
  }

  console.log('end');
  await mongoose.disconnect();
}

Run();
