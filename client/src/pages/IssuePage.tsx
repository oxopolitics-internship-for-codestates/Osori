import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Issues from '../components/issues/Issues';
import IssueNav from '../components/issues/IssueNav';
import TopImg from '../assets/images/up-arrow.png';

const Frame = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	flex-direction: column;
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
	bottom: 20px;
	left: calc(50% + 320px);
	border: none;
	cursor: pointer;
	padding: 15px;
	border-radius: 10px;
	font-size: 18px;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-bottom: 30px;
	padding: 5px;
`;

const TopImage = styled.img`
	width: 50px;
	height: 50px;
`;

interface IssuesData {
	_id: string;
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
	answer: string;
}
function IssuePage({
	setPageChange,
	setTop,
	top,
	setSelectIssue,
}: {
	top: number;
	setPageChange: React.Dispatch<React.SetStateAction<boolean>>;
	setTop: React.Dispatch<React.SetStateAction<number>>;
	setSelectIssue: React.Dispatch<React.SetStateAction<string>>;
}) {
	const [issues, setIssues] = useState<IssuesData[]>([]);
	const [target, setTarget] = useState<(EventTarget & HTMLDivElement) | null>(null);
	const [isLogin, setIsLogin] = useState(false);
	const [userInfo, setUserInfo] = useState({ userName: '', id: '' });
	const [request, setRequest] = useState(false);
	useEffect(() => {
		if (target !== null) {
			target.scrollTo({ top });
		}
		if (issues.length === 0 || request) {
			axios.get(`${process.env.REACT_APP_SERVER_URI}issue/${userInfo.id}`).then((x) => {
				setIssues(x.data);
				setRequest(false);
			});
		}
	}, [top, target, issues, setIssues, userInfo, request]);
	return (
		<Frame
			onMouseOver={(e) => {
				if (target === null) {
					setTarget(e.currentTarget);
				}
			}}
		>
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
			<IssueNav
				userInfo={userInfo}
				isLogin={isLogin}
				setIsLogin={setIsLogin}
				setUserInfo={setUserInfo}
				setIssues={setIssues}
				setTop={setTop}
			/>
			<Context>
				<Issues
					issues={issues}
					setPageChange={setPageChange}
					setTop={setTop}
					target={target}
					userInfo={userInfo}
					setRequest={setRequest}
					setSelectIssue={setSelectIssue}
				/>
			</Context>
		</Frame>
	);
}

export default IssuePage;
