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
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ButtonBox = styled.div`
  display: flex;
`;
const Button = styled.div<{ direc: string }>`
  height: 80%;
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px black;
  ${({ direc }) => {
    if (direc === "L") {
      return `
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      `;
    } else {
      return `
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
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
  justify-content: center;
  align-items: center;
`;

const SelRegionBox = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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
              onClick={() => {
                turnf(true);
              }}
            >
              전국
            </Button>

            <Button
              direc={"R"}
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
            {/* <SelRegionBox>{selr}</SelRegionBox> */}
            {turn ? (
              <Korea
                width={`calc(100% - 55px)`}
                height={"480px"}
                newData={dbinit}
                selrf={selrf}
              ></Korea>
            ) : (
              <Seoul
                width={`calc(100% - 55px)`}
                height={"500px"}
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
