import React from 'react';
import styled from 'styled-components';

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  border: solid 1px red;
  border-radius: 10px;
`

const StaticalNameWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50%;
  margin: 5px 0;
  /* border: solid 1px blue; */
`

const StaticalName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 50px;
  border: solid 2px orange;
  border-radius: 10px;
  box-shadow: 5px 5px 2px grey;
`

const StaticalFigureWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50%;
  margin: 5px 0;
  /* border: solid 1px green; */
`

const StaticalFigure = styled.div`

`

function StaticsBox() {

  return (
    <BoxWrapper>
      <StaticalNameWrapper>
        <StaticalName>남성 응답</StaticalName>
        <StaticalName>여성 응답</StaticalName>
        <StaticalName>남성 최다<br />응답 연령대</StaticalName>
        <StaticalName>여성 최다<br />응답 연령대</StaticalName>
      </StaticalNameWrapper>
      <StaticalFigureWrapper>
        <StaticalFigure>298 명</StaticalFigure>
        <StaticalFigure>195 명</StaticalFigure>
        <StaticalFigure>50 대</StaticalFigure>
        <StaticalFigure>30 대</StaticalFigure>
      </StaticalFigureWrapper>
    </BoxWrapper>
  )
}

export default StaticsBox;