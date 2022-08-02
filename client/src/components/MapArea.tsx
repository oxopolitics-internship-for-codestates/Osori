import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import randomPick from "../etc/randomPick";

import ColorBar from "./ColorBar";
import Korea from "./map/Korea";
import Seoul from "./map/Seoul";

const Frame = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InnerFrame = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ButtonArea = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonBox = styled.div`
  display: flex;
`;
const Button = styled.button<{ direc: string; check: boolean }>`
  user-select: none;
  height: 100%;
  width: 200px;
  display: flex;
  padding: 5px;
  justify-content: center;
  align-items: center;
  border: solid 1px #7c7c7c;
  font-weight: 700;
  ${({ direc }) => {
    if (direc === "L") {
      return `
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      `;
    } else {
      return `
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      `;
    }
  }}
  ${({ check }) => {
    if (check) {
      return `
      color: white;
      background-color: #C181DB;
      `;
    } else {
      return `

      `;
    }
  }}
`;

const MainArea = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
`;
const MapBox = styled.div`
  height: 100%;
  max-width: 545px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
`;

const SelRegionBox = styled.div`
  position: absolute;
  height: 100px;
  width: 150px;
  display: flex;
  margin: 5px;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 20px;
  border: solid 2px #7c7c7c;
  box-shadow: 0px 0px 5px #7c7c7c;
  background-color: white;
  user-select: none;
`;

const ColorBarBox = styled.div`
  height: 100%;
  width: 50px;
`;

let names: { [key: string]: string[] } = {
  전국: [
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
  서울: [
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
  ],
};

let colorSet = [
  "#9749B6",
  "#C181DB",
  "#C1ADD1",
  "#EEA3BF",
  "#FEDDD5",
  "#EAEAEA",
];
function RdColor() {
  let k = Math.floor(6 * Math.random());
  return k > 5 ? 5 : k;
}

interface regionData {
  name: string;
  count: number;
  rate: number;
  color: string;
}

interface mapData {
  name: string;
  count: number;
  min: number;
  max: number;
  data: { [regionName: string]: regionData };
}

let dbinit: mapData[] = [
  { name: "", count: 0, data: {}, min: 100, max: 0 },
  { name: "", count: 0, data: {}, min: 100, max: 0 },
];

let { sdata } = randomPick(10000);
for (let name of ["전국", "서울"]) {
  let sub = name === "전국" ? dbinit[0] : dbinit[1];

  sub.name = name;
  sub.count = sdata[name].count;
  for (let i of names[name]) {
    let [count, rate] = [
      sdata[name].data[i].count,
      Number(((100 * sdata[name].data[i].count) / sub.count).toFixed(2)),
    ];
    if (rate > sub.max) {
      sub.max = rate;
    }
    if (rate < sub.min) {
      sub.min = rate;
    }

    sub.data[`${i}`] = {
      name: i,
      count: count,
      rate: rate,
      color: "",
    };
  }
  let dx = (Math.log(sub.max) - Math.log(sub.min)) / 5;
  for (let i of names[name]) {
    let rate = sub.data[`${i}`].rate;
    let k = 5 - Math.floor((Math.log(rate) - Math.log(sub.min)) / dx);

    k = k < 0 ? 0 : k;
    sub.data[`${i}`].color = colorSet[k];
  }
}

function MapArea() {
  let [turn, turnf] = useState(true);
  let [selr, selrf] = useState("");
  let [data, dataf] = useState(dbinit[0]);

  return (
    <Frame>
      <InnerFrame>
        <ButtonArea>
          <ButtonBox>
            <Button
              direc={"L"}
              check={turn === true}
              onClick={() => {
                turnf(true);
                dataf(dbinit[0]);
              }}
            >
              전국
            </Button>

            <Button
              direc={"R"}
              check={turn === false}
              onClick={() => {
                dataf(dbinit[1]);
                turnf(false);
              }}
            >
              서울
            </Button>
          </ButtonBox>
        </ButtonArea>
        <MainArea>
          <MapBox>
            {selr.length > 0 ? (
              <SelRegionBox>
                {selr}
                <br />
                {`${data.data[selr].count} 명`}
                <br />
                {`${data.data[selr].rate}%`}
              </SelRegionBox>
            ) : (
              <SelRegionBox>
                {data.name}
                <br />
                {`${data.count} 명`}
                <br />
                {"100%"}
              </SelRegionBox>
            )}
            {turn ? (
              <Korea
                width={"100%"}
                height={"100%"}
                newData={data}
                selrf={selrf}
              ></Korea>
            ) : (
              <Seoul
                width={"100%"}
                height={"100%"}
                newData={data}
                selrf={selrf}
              ></Seoul>
            )}
          </MapBox>
          <ColorBarBox>
            <ColorBar></ColorBar>
          </ColorBarBox>
        </MainArea>
      </InnerFrame>
    </Frame>
  );
}

export default MapArea;
