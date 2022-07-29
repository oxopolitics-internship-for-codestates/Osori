import React from "react";
import styled, { keyframes } from "styled-components";
import osori from "./scandi-123.png";

//전체 콘테이너
const Waiting = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

//이미지 애니메이션 효과
const rotate = keyframes`  
from {
    -webkit-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  to {
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);    
  }
`;

//이미지 적용 & 이미지 설정
const Osori = styled.img`
  height: 100px;
  margin-bottom: 10px;
  animation: alternate-reverse 1s ${rotate} infinite;
`;

//텍스트 설정
const Text = styled.div`
  font-size: 20px;
  font-weight: 900;
`;

function StatisticsWaiting() {
    return (
        <Waiting>
            <Osori src={osori} />
            <Text>원하시는 지역을 선택해주세요</Text>
        </Waiting>
    );
}

export default StatisticsWaiting;