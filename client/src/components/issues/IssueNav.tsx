import React from "react";
import styled from "styled-components";
import HomeImg from "../assets/images/newsImg.png";

const Frame = styled.div`
  width: 100%;
`;

const Title = styled.span`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border-bottom: 1px solid gray;
`;

const NewsImg = styled.img`
  height: 50px;
  margin: 20px 0;
  /* margin-right: 20px; */
`;

// const TitleName = styled.span`
//   margin: 20px 0;
//   font-size: 20px;
//   font-weight: 900;
// `;

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
        {/* <TitleName>Issue</TitleName> */}
      </Title>
      {/* <Menu><MenuTitle>News</MenuTitle></Menu> */}
    </Frame>
  );
}

export default IssueNav;
