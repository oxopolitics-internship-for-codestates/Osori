interface answer {
  yes: number;
  no: number;
  so: number;
}

interface gender {
  count: number;
  answer: answer;
  age: age;
}
interface age {
  count: number;
  [key: string]: number;
}
interface regionData {
  name: string;
  count: number;
  male: gender;
  female: gender;
}

interface regionData2 {
  name: string;
  count: number;
}
interface data {
  [key: string]: regionData2;
}

interface mapData {
  name: string;
  count: number;
  data: data;
}

export { regionData, mapData };
