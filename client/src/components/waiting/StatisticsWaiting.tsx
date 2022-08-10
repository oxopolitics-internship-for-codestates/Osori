import React from 'react';
import styled, { keyframes } from 'styled-components';
import osori from '../../assets/images/scandi-123.png';

// 전체 콘테이너
const Waiting = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	max-width: 500px;
	height: 100vh;
	margin: 0;
	padding: 0 20px;
	gap: 50px;
	justify-content: center;
	align-items: center;
	user-select: none;
`;

// 이미지 애니메이션 효과
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

const ImgDiv = styled.div`
	max-height: 100px;
	margin: 0 auto;
	user-select: none;
`;

// 이미지 적용 & 이미지 설정
const Osori = styled.img`
	height: 100%;
	animation: alternate-reverse 1s ${rotate} infinite;
	user-select: none;
`;

// 텍스트 설정
const Text = styled.div`
	font-size: 20px;
	font-weight: 900;
	user-select: none;
`;

function StatisticsWaiting() {
	return (
		<Waiting>
			<ImgDiv>
				<Osori src={osori} />
			</ImgDiv>
			<Text>원하시는 지역을 선택해주세요</Text>
		</Waiting>
	);
}

export default StatisticsWaiting;
