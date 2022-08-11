import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import IssueList from '../components/issues/Issues';
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
	right: 200px;
	z-index: 99;
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
