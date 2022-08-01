import { useEffect, useState } from "react";
import styled from "styled-components";
import { useScale } from "victory";
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
const Button = styled.div<{ direc: string; check: boolean }>`
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
`;

const ColorBarBox = styled.div`
  height: 100%;
  width: 50px;
`;

let names: { [key: string]: string[] } = {
  전국: [
    "KR-11",
    "KR-26",
    "KR-27",
    "KR-28",
    "KR-29",
    "KR-30",
    "KR-31",
    "KR-41",
    "KR-42",
    "KR-43",
    "KR-44",
    "KR-45",
    "KR-46",
    "KR-47",
    "KR-48",
    "KR-49",
    "KR-50",
  ],
  서울: [
    "CD11110",
    "CD11140",
    "CD11170",
    "CD11200",
    "CD11215",
    "CD11230",
    "CD11260",
    "CD11290",
    "CD11305",
    "CD11320",
    "CD11350",
    "CD11380",
    "CD11410",
    "CD11440",
    "CD11470",
    "CD11500",
    "CD11530",
    "CD11545",
    "CD11560",
    "CD11590",
    "CD11620",
    "CD11650",
    "CD11680",
    "CD11710",
    "CD11740",
  ],
};

let dbinit: { [key: string]: { fill: string } } = {};
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

for (let i in names) {
  names[i].forEach((x) => {
    dbinit[`${x}`] = { fill: colorSet[RdColor()] };
  });
}

function MapArea() {
  let [turn, turnf] = useState(true);
  let [selr, selrf] = useState("");

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
              }}
            >
              전국
            </Button>

            <Button
              direc={"R"}
              check={turn === false}
              onClick={() => {
                turnf(false);
              }}
            >
              서울
            </Button>
          </ButtonBox>
        </ButtonArea>
        <MainArea>
          <MapBox>
            {/* 마우스 오버 지역 이름 표시 및 색 통계에대한 데이터 전달 목적. 실제 구현할지는 모르겠음. */}
            {selr.length > 0 ? (
              <SelRegionBox>
                {/* 내용물을 채울 컴포넌트를 고민해볼것 아니면 현재 위치에라도 지명과 데이터의 글자 크기는 다르게 하는게 좋을것 같다.
                박스의 외형을 어떠헥 터리하는게 좋을까
                글을 가운데 정렬이 보기는 좋을 것 같은데... 아닌가 우측으로 정렬 할까...
              */}

                {selr}
                <br />
                {"100명"}
                <br />
                {"5%"}
              </SelRegionBox>
            ) : null}
            {turn ? (
              <Korea
                width={`100%`}
                height={"100%"}
                newData={dbinit}
                selrf={selrf}
              ></Korea>
            ) : (
              <Seoul
                width={`100%`}
                height={"100%"}
                newData={dbinit}
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
