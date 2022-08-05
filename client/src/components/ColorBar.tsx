import React from 'react';
import styled from 'styled-components';

const Frame = styled.div`
	user-select: none;
	height: 100%;
	width: 55px;
	display: flex;
	flex-direction: column;
	padding-bottom: 50px;
	justify-content: flex-end;
`;
const InnerFrame = styled.div`
	width: 100%;
	display: flex;
	flex: 1 0 1;
	align-items: center;
	margin-top: 20px;
`;
const ColorBox = styled.div`
	width: 20px;
	display: flex;
	flex-direction: column;
`;
const LabelBox = styled.div`
	height: 100%;
	width: 25px;
	display: flex;
	flex-direction: column;
	margin-left: 5px;
	justify-content: space-between;
`;
const Label = styled.div<{ width: number }>`
	width: ${({ width }) => width}px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
`;
const Box = styled.div<{ color: string }>`
	width: 20px;
	height: 50px;
	background-color: ${({ color }) => `${color}`};
	border-radius: 10px;
	border: solid 1px black;
`;

const colorSet = ['#9749B6', '#C181DB', '#C1ADD1', '#EEA3BF', '#FEDDD5', '#EAEAEA'];

function ColorBar() {
	return (
		<Frame>
			<Label width={50}>응답률(%)</Label>
			<InnerFrame>
				<ColorBox>
					{colorSet.map((x, i) => {
						const key = `${x}${i}`;
						return <Box key={key} color={x} />;
					})}
				</ColorBox>
				<LabelBox>
					<Label width={30}>높음</Label>
					<Label width={30}>낮음</Label>
				</LabelBox>
			</InnerFrame>
		</Frame>
	);
}

export default ColorBar;
