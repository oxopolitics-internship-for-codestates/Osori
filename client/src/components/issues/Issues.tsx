import axios from 'axios';
import React from 'react';
import styled from 'styled-components';
import CountNewUser from '../../etc/CountNewUser';

const WholeFrame = styled.div`
	display: flex;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const Frame = styled.div`
	display: flex;
	flex-direction: column;
	border: 1px solid #bfbfbf;
	padding: 20px 0px;
	width: 600px;
	justify-content: center;
	align-items: center;
	margin: 30px 0;
	box-shadow: 1px 2px 5px #7c7c7c;
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
	margin-top: 10px;
`;

const Answers = styled.div`
	display: flex;
	border-bottom: 1px solid #bfbfbf;
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
	color: whitesmoke;
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
			return hoverColor || 'rgba(151, 73, 182, 0.80)';
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
	width: 450px;
	margin: 20px 45px;
	padding: 10px;
	box-shadow: 2px 1px 5px #7c7c7c;
`;

const Example = styled.div`
	margin: 10px;
`;

const ExampleList1 = styled.span<{ examplListLS?: string }>`
	letter-spacing: ${({ examplListLS }) => examplListLS || '0px'};
	font-weight: 900;
	margin-right: 10px;
`;

const ExampleList2 = styled.span`
	border-left: 1px solid #878787;
	padding-left: 5px;
`;

const CheckBtnFrame = styled.div`
	display: flex;
	width: 100%;
`;

const CheckBtn = styled.button`
	font-size: 17px;
	font-weight: 500;
	border: 1px solid white;
	border-radius: 10px;
	background-color: white;
	margin: auto 0 0 auto;
	margin-right: 25px;
	padding: 2px;
	color: #878787;
	cursor: pointer;
	&:hover {
		color: #9749b6;
	}
`;
interface Answer {
	yes: number;
	no: number;
	so: number;
}

interface Gender {
	count: number;
	answer: Answer;
	age: Age;
}
interface Age {
	count: number;
	[key: string]: number;
}

interface SubData {
	name: string;
	count: number;
	male: Gender;
	female: Gender;
}
interface Data {
	[key: string]: SubData;
}
interface MapData {
	name: string;
	count: number;
	data: Data;
}

interface DbData {
	[key: string]: MapData;
}
interface Tdata {
	[key: string]: DbData;
}
interface DataForm {
	id: string;
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
	answer?: string;
}
interface IssuesData {
	_id: string;
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
	answer?: string;
}

function Issues({
	issues,
	setIssues,
	setPageChange,
	target,
	setTop,
	statsData,
	setSelectIssue,
	userInfo,
	setRequest,
	setSelectIssueNumber,
}: {
	issues: DataForm[];
	setIssues: React.Dispatch<React.SetStateAction<DataForm[]>>;
	setPageChange: React.Dispatch<React.SetStateAction<boolean>>;
	target: (EventTarget & HTMLDivElement) | null;
	setTop: React.Dispatch<React.SetStateAction<number>>;
	statsData: Tdata;
	setSelectIssue: React.Dispatch<React.SetStateAction<string>>;
	userInfo: { userName: string; id: string; gender?: string; age?: string; address?: string };
	setRequest: React.Dispatch<React.SetStateAction<boolean>>;
	setSelectIssueNumber: React.Dispatch<React.SetStateAction<number>>;
}) {
	return (
		<WholeFrame>
			{issues.length > 0
				? issues.map((issue, idx) => {
						const key = `isssue${idx}`;

						return (
							<Frame key={key}>
								<Issue>
									<Topic>{issue.title}</Topic>
									<Answers>
										<Ans
											padValue="8px 25px"
											backC="#9749B6"
											marginL="50px"
											pressed={issue.answer !== undefined ? issue.answer === '네' : false}
											close={issue.answer !== undefined}
											onClick={() => {
												if (issue.answer === undefined && userInfo.id.length > 0) {
													// axios
													// 	.post(`${process.env.REACT_APP_SERVER_URI}issue/answer`, {
													// 		userId: userInfo.id,
													// 		// eslint-disable-next-line no-underscore-dangle
													// 		issueId: issue._id,
													// 		answer: '네',
													// 	})
													// 	.then(() => {
													// 		if (target !== null) {
													// 			setTop(target.scrollTop);
													// 		}
													// 		setRequest(true);
													// 	});
													// setIssues([...issues.slice(0, idx), { ...issue, answer: '네' }, ...issues.slice(idx + 1)]);
													setIssues([]);
													// let address =userInfo.address
													// let sadr=address?.split(' ')
													// let map='전국'
													// if (sadr!==undefined &&sadr?.length > 1){
													// }
													// statsData[idx][map]
													CountNewUser(
														{
															userName: userInfo.userName,
															gender: userInfo.gender || '',
															address: userInfo.address || '',
															age: userInfo.age || '',
															answer: '네',
														},
														statsData[issue.id]
													);
													if (target !== null) {
														setTop(target.scrollTop);
													}
													setRequest(true);
												}
											}}
										>
											네
										</Ans>
										<Ans
											padValue="8px 10px"
											backC="#EEA3BF"
											hoverColor="rgba(238, 163, 191, 0.80)"
											pressed={issue.answer !== undefined ? issue.answer === '글세요' : false}
											close={issue.answer !== undefined}
											onClick={() => {
												if (issue.answer === undefined && userInfo.id.length > 0) {
													// axios
													// 	.post(`${process.env.REACT_APP_SERVER_URI}issue/answer`, {
													// 		userId: userInfo.id,
													// 		// eslint-disable-next-line no-underscore-dangle
													// 		issueId: issue._id,
													// 		answer: '글세요',
													// 	})
													// 	.then(() => {
													// 		if (target !== null) {
													// 			setTop(target.scrollTop);
													// 		}
													// 		setRequest(true);
													// 	});
													setIssues([
														...issues.slice(0, idx),
														{ ...issue, answer: '글세요' },
														...issues.slice(idx + 1),
													]);
													CountNewUser(
														{
															userName: userInfo.userName,
															gender: userInfo.gender || '',
															address: userInfo.address || '',
															age: userInfo.age || '',
															answer: '글세요',
														},
														statsData[issue.id]
													);
													if (target !== null) {
														setTop(target.scrollTop);
													}
													setRequest(true);
												}
											}}
										>
											글쎄요
										</Ans>
										<Ans
											padValue="8px 10px"
											backC="#C1ADD1"
											hoverColor="rgba(193, 173, 209, 0.80)"
											pressed={issue.answer ? issue.answer === '아니요' : false}
											close={issue.answer !== undefined}
											onClick={() => {
												if (issue.answer === undefined && userInfo.id.length > 0) {
													// axios
													// 	.post(`${process.env.REACT_APP_SERVER_URI}issue/answer`, {
													// 		userId: userInfo.id,
													// 		// eslint-disable-next-line no-underscore-dangle
													// 		issueId: issue._id,
													// 		answer: '아니요',
													// 	})
													// 	.then(() => {
													// 		if (target !== null) {
													// 			setTop(target.scrollTop);
													// 		}
													// 		setRequest(true);
													// 	});
													setIssues([
														...issues.slice(0, idx),
														{ ...issue, answer: '아니요' },
														...issues.slice(idx + 1),
													]);
													CountNewUser(
														{
															userName: userInfo.userName,
															gender: userInfo.gender || '',
															address: userInfo.address || '',
															age: userInfo.age || '',
															answer: '아니요',
														},
														statsData[issue.id]
													);
													if (target !== null) {
														setTop(target.scrollTop);
													}
													setRequest(true);
												}
											}}
										>
											아니요
										</Ans>
									</Answers>
									<Examples>
										<Example>
											<ExampleList1 examplListLS="28px">네</ExampleList1>
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
								<CheckBtnFrame>
									<CheckBtn
										onClick={() => {
											if (target !== null) {
												setTop(target.scrollTop);
											}
											// setSelectIssueNumber(idx);
											// eslint-disable-next-line no-underscore-dangle
											setSelectIssue(issue.id);
											setPageChange(false);
										}}
									>
										통계보기
									</CheckBtn>
								</CheckBtnFrame>
							</Frame>
						);
				  })
				: null}
		</WholeFrame>
	);
}

export default Issues;
