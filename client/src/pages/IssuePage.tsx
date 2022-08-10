import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import IssueList from '../components/issues/Issues';
import IssueNav from '../components/issues/IssueNav';
import TopImg from '../assets/images/up-arrow.png';

const fadeOut = keyframes`
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
`;

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Frame = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;

const Context = styled.div`
	margin-top: 100px;
`;

const TopButton = styled.div`
	position: fixed;
	bottom: 20px; /* Place the button at the bottom of the page */
	right: 200px; /* Place the button 30px from the right */
	z-index: 99; /* Make sure it does not overlap */
	border: none; /* Remove borders */
	cursor: pointer; /* Add a mouse pointer on hover */
	padding: 15px; /* Some padding */
	border-radius: 10px; /* Rounded corners */
	font-size: 18px; /* Increase font size */
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* background-color: white; */
	flex-direction: column;
	margin-bottom: 30px;
	padding: 5px;
`;

const TopImage = styled.img`
	width: 50px;
	height: 50px;
`;
const Button = styled.button`
	position: absolute;
	right: calc((100% - 1200px) / 2);
	width: 50px;
	height: 50px;
`;
const Button2 = styled.button<{ logIn: boolean }>`
	position: absolute;
	right: calc(((100% - 1200px) / 2) + 60px);
	width: 50px;
	height: 50px;
	opacity: 0;
	animation: ${({ logIn }) => (logIn ? fadeIn : fadeOut)} 2s;
	animation-fill-mode: forwards;
`;

interface IssuesData {
	_id: string;
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
	answers?: { _id: string; answer: string }[];
}
function IssuePage({
	pageChange,
	setPageChange,
	setTop,
	top,
	setSelectIssue,
}: {
	pageChange: boolean;
	top: number;
	setPageChange: React.Dispatch<React.SetStateAction<boolean>>;
	setTop: React.Dispatch<React.SetStateAction<number>>;
	setSelectIssue: React.Dispatch<React.SetStateAction<string>>;
}) {
	const [issues, setIssues] = useState<IssuesData[]>([]);
	const [target, setTarget] = useState<(EventTarget & HTMLDivElement) | null>(null);
	const [isLogin, setIsLogin] = useState(false);
	const [userInfo, setUserInfo] = useState({ userName: '', id: '' });
	const [isBoot, setIsBoot] = useState(false);
	useEffect(() => {
		if (target !== null) {
			target.scrollTo({ top });
		}
		if (issues.length === 0) {
			axios.get(`${process.env.REACT_APP_SERVER_URI}issue`).then((x) => {
				setIssues(x.data);
			});
		}
	}, [top, target, issues, setIssues]);
	return (
		<Frame
			onMouseOver={(e) => {
				if (target === null) {
					setTarget(e.currentTarget);
				}
			}}
		>
			<IssueNav />
			{isBoot ? <Button2 logIn={isLogin}>글쓰기</Button2> : null}
			{isLogin ? (
				<Button
					onClick={() => {
						axios.get(`${process.env.REACT_APP_SERVER_URI}issue`).then((x) => {
							setIssues(x.data);
							setIsLogin(false);
						});
					}}
				>
					로그아웃
				</Button>
			) : (
				<Button
					onClick={() => {
						axios.get(`${process.env.REACT_APP_SERVER_URI}user`).then((x) => {
							// eslint-disable-next-line no-underscore-dangle
							const data = { userName: x.data.userName, id: x.data._id };

							setUserInfo(data);
							return axios.get(`${process.env.REACT_APP_SERVER_URI}issue/${data.id}`).then((reIssueData) => {
								setIssues(reIssueData.data);
								setIsLogin(true);
								if (!isBoot) {
									setIsBoot(true);
								}
							});
						});
					}}
				>
					로그인
				</Button>
			)}
			<Context>
				<IssueList
					issues={issues}
					setPageChange={setPageChange}
					setTop={setTop}
					target={target}
					setSelectIssue={setSelectIssue}
				/>
			</Context>
			<TopButton
				onClick={() => {
					if (target !== null) {
						target.scrollTo({ top: 0, behavior: 'smooth' });
					}
				}}
			>
				<TopImage src={TopImg} alt="" />
				Top
			</TopButton>
		</Frame>
	);
}

export default IssuePage;
