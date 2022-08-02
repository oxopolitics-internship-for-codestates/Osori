import React, { useState } from 'react';
import styled from 'styled-components';

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border: solid 2px #c181db;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #d0d0d0;
  flex-wrap: nowrap;
`

const StaticalNameWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin-top: 7px;
`

const StaticalName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 50px;
  color: #DC735E;
  font-weight: 600;
  border: solid 1px #c181db;
  border-radius: 10px;
  box-shadow: 2px 2px 5px #d0d0d0;
`

const StaticalFigureWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50%;
  margin: 5px 0;
`

const StaticalFigure = styled.div`

`


function StaticsBox() {
  const [maleResponse, setMaleResponse] = useState(0);
  const [femaleResponse, setFemaleResponse] = useState(0);
  const [highestMaleResponseAge, setHighestMaleResponseAge] = useState('');
  const [highestFemaleResponseAge, setHighestFemaleResponseAge] = useState('');


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