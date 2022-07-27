import { useState } from "react";
import styled from "styled-components";
import { useScale } from "victory";
import Korea from "./map/korea";
import Seoul from "./map/seoul";

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
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 10px;
  border: solid 1px black;
`;
const Button = styled.div`
  height: 80%;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainArea = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
`;
const MapBox = styled.div`
  height: 100%;
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

for (let i in names) {
  names[i].forEach((x) => {
    dbinit[`${x}`] = { fill: "#B9B9B9" };
  });
}

function MapArea() {
  let [turn, turnf] = useState(true);
  return (
    <Frame>
      <InnerFrame>
        <ButtonArea>
          <ButtonBox>
            <Button
              onClick={() => {
                turnf(true);
              }}
            >
              전국
            </Button>
            <Button
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
            {turn ? (
              <Korea width={550} height={550} newData={dbinit}></Korea>
            ) : (
              <Seoul width={550} height={600} newData={dbinit}></Seoul>
            )}
          </MapBox>
          <ColorBarBox></ColorBarBox>
        </MainArea>
      </InnerFrame>
    </Frame>
  );
}

export default MapArea;
