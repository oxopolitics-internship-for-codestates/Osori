import React from 'react';
import styled from 'styled-components';

const Frame = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid #878787;
	border-radius: 20px;
	padding: 20px 0px;
	width: 550px;
	justify-content: center;
	align-items: center;
	margin-top: 30px;
`;

const Issue = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Topic = styled.div`
	text-align: center;
	font-size: 20px;
	font-weight: 900;
`;

const Answer = styled.div`
	display: flex;
	border-bottom: 1px solid #878787;
`;

const Ans = styled.button<{ padValue: string; marginL?: string; hoverColor?: string }>`
	font-size: 15px;
	border: 1px solid #878787;
	border-radius: 10px;
	${({ padValue }) => `padding : ${padValue} ;`}
	margin: 20px 50px;
	margin-left: ${({ marginL }) => marginL || '0px'};
	background-color: rgb(230, 230, 230);
	&:hover {
		background-color: ${({ hoverColor }) => hoverColor || '#519b7a'};
	}
	cursor: pointer;
`;

const Examples = styled.div`
	background-color: rgb(230, 230, 230);
	border-radius: 20px;
	width: 90%;
	margin: 20px 45px;
	padding: 10px;
`;

const Example = styled.div`
	margin: 10px 0px 10px;
`;

const ExampleList1 = styled.span<{ examplListLS?: string }>`
	letter-spacing: ${({ examplListLS }) => examplListLS || '0px'};
	text-align: center;
	font-weight: 900;
	margin-left: 20px;
`;

const ExampleList2 = styled.span`
	/* margin-right: 100px; */
`;

const ConfirmDiv = styled.div`
	display: flex;
	width: 100%;
`;

const Confirm = styled.button`
	font-size: 17px;
	font-weight: 500;
	border: 1px solid white;
	border-radius: 10px;
	background-color: white;
	margin: auto 0 0 auto;
	margin-right: 25px;
	padding: 2px;
	cursor: pointer;
`;

interface DummyissuesProps {
	title: string;
	yes: string;
	so: string;
	no: string;
}

function Issues({ issues }: { issues: DummyissuesProps[] }) {
	return (
		<div id="scroll">
			{issues.map((issue, idx) => {
				const key = `isssue${idx}`;
				return (
					<Frame key={key}>
						<Issue>
							<Topic>{issue.title}</Topic>
							<Answer>
								<Ans padValue="8px 25px" marginL="50px">
									네
								</Ans>
								<Ans padValue="8px 10px" hoverColor="#fbcd57">
									글쎄요
								</Ans>
								<Ans padValue="8px 10px" hoverColor="#fb7b77">
									아니요
								</Ans>
							</Answer>
							<Examples>
								<Example>
									<ExampleList1 examplListLS="30px">네</ExampleList1>
									<ExampleList2> {issue.yes}</ExampleList2>
								</Example>
								<Example>
									<ExampleList1>글쎄요</ExampleList1>
									<ExampleList2> {issue.so}</ExampleList2>
								</Example>
								<Example>
									<ExampleList1>아니요</ExampleList1>
									<ExampleList2> {issue.no}</ExampleList2>
								</Example>
							</Examples>
						</Issue>
						<ConfirmDiv>
							<Confirm>통계보기</Confirm>
						</ConfirmDiv>
					</Frame>
				);
			})}
		</div>
	);
}

export default Issues;
