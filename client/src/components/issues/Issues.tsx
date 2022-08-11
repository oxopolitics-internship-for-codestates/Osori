import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Frame = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid #878787;
	border-radius: 20px;
	padding: 20px 0px;
	width: 600px;
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

const Ans = styled.button<{
	padValue: string;
	marginL?: string;
	hoverColor?: string;
	backC?: string;
	pressed: boolean;
	close: boolean;
}>`
	align-items: center;
	background: ${({ backC }) => {
		return backC || '#eeeeee';
	}};
	border: 0 solid #e2e8f0;
	box-shadow: ${({ pressed, close }) => {
		if (close) {
			return pressed
				? 'inset 2px 2px 5px black;'
				: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 1);';
		}
		return pressed ? 'inset 2px 2px 5px black;' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 1);';
	}};
	box-sizing: border-box;
	color: #1a202c;
	display: inline-flex;
	font-family: Inter, sans-serif;
	font-size: 1rem;
	font-weight: 700;
	height: 45px;
	justify-content: center;
	line-height: 24px;
	overflow-wrap: break-word;
	${({ padValue }) => `padding : ${padValue} ;`}
	margin: 20px 50px;
	margin-left: ${({ marginL }) => marginL || '0px'};
	text-decoration: none;
	width: auto;
	border-radius: 8px;
	cursor: pointer;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	&:hover {
		background-color: ${({ hoverColor }) => {
			return hoverColor || 'rgba(81, 155, 122, 0.80)';
		}};
	}
	&:active {
		${({ pressed, close }) => {
			if (close) {
				return pressed
					? 'box-shadow: inset 2px 2px 5px black;'
					: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 1);';
			}
			return !pressed ? 'box-shadow: inset 2px 2px 5px black;' : '';
		}}
	}
`;

const Examples = styled.div`
	background-color: rgb(230, 230, 230);
	border-radius: 20px;
	width: 450px;
	margin: 20px 45px;
	padding: 10px;
	box-shadow: inset 0px 0px 10px #7c7c7c;
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

const ExampleList2 = styled.span``;

const ConfirmDiv = styled.div`
	display: flex;
	width: 100%;
`;

const Div = styled.div`
	display: flex;
	width: 100%;
	display: flex;
	flex-direction: column;
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

interface IssuesData {
	_id: string;
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
	answer: string;
}

function Issues({
	issues,
	setPageChange,
	target,
	setTop,
	setSelectIssue,
	userInfo,
	setRequest,
}: {
	issues: IssuesData[];
	setPageChange: React.Dispatch<React.SetStateAction<boolean>>;
	target: (EventTarget & HTMLDivElement) | null;
	setTop: React.Dispatch<React.SetStateAction<number>>;
	setSelectIssue: React.Dispatch<React.SetStateAction<string>>;
	userInfo: { userName: string; id: string };
	setRequest: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<Div>
			{issues.length > 0
				? issues.map((issue, idx) => {
						const key = `isssue${idx}`;

						return (
							<Frame key={key}>
								<Issue>
									<Topic>{issue.title}</Topic>
									<Answer>
										<Ans
											padValue="8px 25px"
											backC="#519b7a"
											marginL="50px"
											pressed={issue.answer !== undefined ? issue.answer === '네' : false}
											// pressed={pressed[issue.title][0]}
											close={issue.answer !== undefined}
											onClick={() => {
												if (issue.answer === undefined) {
													axios
														.post(`${process.env.REACT_APP_SERVER_URI}issue/answer`, {
															userId: userInfo.id,
															// eslint-disable-next-line no-underscore-dangle
															issueId: issue._id,
															answer: '네',
														})
														.then((x) => {
															if (target !== null) {
																setTop(target.scrollTop);
															}
															setRequest(true);
														});
												}
											}}
										>
											네
										</Ans>
										<Ans
											padValue="8px 10px"
											backC="#fbcd57"
											hoverColor="rgba(251, 205, 87, 0.80)"
											pressed={issue.answer !== undefined ? issue.answer === '글세요' : false}
											close={issue.answer !== undefined}
											onClick={() => {
												if (issue.answer === undefined) {
													axios
														.post(`${process.env.REACT_APP_SERVER_URI}issue/answer`, {
															userId: userInfo.id,
															// eslint-disable-next-line no-underscore-dangle
															issueId: issue._id,
															answer: '글세요',
														})
														.then(() => {
															if (target !== null) {
																setTop(target.scrollTop);
															}
															setRequest(true);
														});
												}
											}}
										>
											글쎄요
										</Ans>
										<Ans
											padValue="8px 10px"
											backC="#fb7b77"
											hoverColor="rgba(251, 123, 119, 0.80)"
											pressed={issue.answer ? issue.answer === '아니요' : false}
											close={issue.answer !== undefined}
											onClick={() => {
												if (issue.answer === undefined) {
													axios
														.post(`${process.env.REACT_APP_SERVER_URI}issue/answer`, {
															userId: userInfo.id,
															// eslint-disable-next-line no-underscore-dangle
															issueId: issue._id,
															answer: '아니요',
														})
														.then(() => {
															if (target !== null) {
																setTop(target.scrollTop);
															}
															setRequest(true);
														});
												}
											}}
										>
											아니요
										</Ans>
									</Answer>
									<Examples>
										<Example>
											<ExampleList1 examplListLS="30px">네</ExampleList1>
											<ExampleList2> {issue.answerTextO}</ExampleList2>
										</Example>
										<Example>
											<ExampleList1>글쎄요</ExampleList1>
											<ExampleList2> {issue.answerTextS}</ExampleList2>
										</Example>
										<Example>
											<ExampleList1>아니요</ExampleList1>
											<ExampleList2> {issue.answerTextX}</ExampleList2>
										</Example>
									</Examples>
								</Issue>
								<ConfirmDiv>
									<Confirm
										onClick={() => {
											if (target !== null) {
												setTop(target.scrollTop);
											}
											// eslint-disable-next-line no-underscore-dangle
											setSelectIssue(issue._id);
											setPageChange(false);
										}}
									>
										통계보기
									</Confirm>
								</ConfirmDiv>
							</Frame>
						);
				  })
				: null}
		</Div>
	);
}

export default Issues;
