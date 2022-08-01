interface dataForm {
  userName: string;
  age: string;
  email: string;
  address: string;
  answer: string;
  gender: string;
}

function answerF() {
  let data = ["네", "아니요", "글세요"];
  let k = Math.random() * 3;
  k = k > 2 ? 2 : k;
  return data[k];
}

function addressF() {
  let ans = "";
  let a = [
      "서울특별시",
      "부산광역시",
      "대구광역시",
      "인천광역시",
      "광주광역시",
      "대전광역시",
      "울산광역시",
      "경기도",
      "강원도",
      "충청북도",
      "충청남도",
      "전라북도",
      "전라남도",
      "경상북도",
      "경상남도",
      "제주특별자치도",
      "세종특별자치시",
    ],
    b = [
      "종로구",
      "중구",
      "용산구",
      "성동구",
      "광진구",
      "동대문구",
      "중랑구",
      "성북구",
      "강북구",
      "도봉구",
      "노원구",
      "은평구",
      "서대문구",
      "마포구",
      "양천구",
      "강서구",
      "구로구",
      "금천구",
      "영등포구",
      "동작구",
      "관악구",
      "서초구",
      "강남구",
      "송파구",
      "강동구",
    ];
  let ac = 17 * Math.random();
  ac = ac > 16 ? 16 : ac;
  ans += a[ac];
  if (ac === 0) {
    let bc = 25 * Math.random();
    bc = bc > 24 ? 24 : bc;
    ans += " " + b[bc];
  }

  return ans;
}

function genderF() {
  let k = Math.random();
  return k > 0.5 ? "남" : "여";
}
function ageF() {
  let k = 50 * (Math.random() * Math.random() + 0.3 * Math.random()) + 10;
  return `${Math.floor(k / 10) * 10}대`;
}

export default function randomPick(n: number) {
  let data: dataForm[] = [],
    l = `${n}`.length;

  for (let i = 0; i < n; i++) {
    let p = `${i}`.padStart(l + 1, "0");
    data[i] = {
      userName: "name" + p,
      gender: genderF(),
      age: ageF(),
      email: "email" + p + "@gmail.com",
      address: addressF(),
      answer: answerF(),
    };
  }

  return data;
}
