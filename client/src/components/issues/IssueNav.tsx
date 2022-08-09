import React from 'react';
import styled from 'styled-components';
import HomeImg from '../../assets/images/issueImg.png';

const Frame = styled.div`
	width: 100%;
	position: fixed;
	background-color: white;
`;

const Title = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 10px;
	border-bottom: 1px solid gray;
`;

const NewsImg = styled.img`
	height: 50px;
	margin: 20px;
	margin-right: 20px;
`;

const TitleName = styled.span`
	font-size: 20px;
	font-weight: 900;
`;

// const Menu = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
// `;

// const MenuTitle = styled.div``;

function IssueNav() {
	return (
		<Frame>
			<Title>
				<NewsImg src={HomeImg} />
				<TitleName>Issue</TitleName>
			</Title>
			{/* <Menu>
        <MenuTitle>News</MenuTitle>
      </Menu> */}
		</Frame>
	);
}

export default IssueNav;
