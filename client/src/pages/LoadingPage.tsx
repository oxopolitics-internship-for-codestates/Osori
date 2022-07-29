import React from 'react';
import styled, { keyframes } from 'styled-components';
import osori from "../img/scandi-123.png";

//전체 콘테이너
const Loading = styled.div`
display: flex;
width: 100vw;
height: 100vh;
justify-content:center;
align-items:center;
`

//이미지 360도 회전 효과
const rotate = keyframes`  
from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`
//이미지 적용 & 이미지 설정
const Osori = styled.img`
    height: 50px;
    margin-right: 10px;
    animation: 3s linear ${rotate} infinite;
`

//텍스트 설정
const Text = styled.span`
font-size: 25px;
font-weight : 900;
`

function LoadingPage() {

    return (
        <Loading>
            <Osori src={osori} />
            <Text>잠시만 기다려주세요</Text>
        </Loading>


    );
}

export default LoadingPage;