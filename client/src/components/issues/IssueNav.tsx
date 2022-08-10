import React from 'react';
import styled from 'styled-components';
import HomeImg from '../../assets/images/IssueImage.png';
import osoriLogo from '../../assets/images/osori-logo.png';

const Frame = styled.div`
	width: 100%;
	height: 100px;
	position: fixed;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1px solid #dedede;
`;

const LogoFrame = styled.div`
	width: 150px;
`;
const Logo = styled.img`
	width: 100%;
`;

const Title = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
	width: 150px;
`;

const NewsImg = styled.img`
	height: 50px;
	margin: 20px;
	margin-right: 20px;
`;

function IssueNav() {
	return (
		<Frame>
			<LogoFrame>
				<Logo src={osoriLogo} />
			</LogoFrame>
			<Title>
				<NewsImg src={HomeImg} />
			</Title>
		</Frame>
	);
}

export default IssueNav;
