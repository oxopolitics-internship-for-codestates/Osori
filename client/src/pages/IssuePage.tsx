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
interface IssuesData {
	_id: string;
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
	answer: string;
}

interface DataForm {
	id: string;
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
	answer?: string;
}
function IssuePage({
	setPageChange,
	setTop,
	top,
	isLogin,
	setIsLogin,
	setSelectIssue,
	setSelectIssueNumber,
	userInfo,
	setUserInfo,
	statsData,
	issues,
	setIssues,
	NewStatsForm,
}: {
	issues: DataForm[];
	setIssues: React.Dispatch<React.SetStateAction<DataForm[]>>;
	top: number;
	userInfo: { id: string; userName: string; gender?: string; age?: string; address?: string };
	isLogin: boolean;
	setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
	setUserInfo: React.Dispatch<
		React.SetStateAction<{ id: string; userName: string; gender?: string; age?: string; address?: string }>
	>;
	setPageChange: React.Dispatch<React.SetStateAction<boolean>>;
	setTop: React.Dispatch<React.SetStateAction<number>>;
	setSelectIssue: React.Dispatch<React.SetStateAction<string>>;
	setSelectIssueNumber: React.Dispatch<React.SetStateAction<number>>;
	statsData: Tdata;
	NewStatsForm: (id: string) => void;
}) {
	const [target, setTarget] = useState<(EventTarget & HTMLDivElement) | null>(null);
	const [request, setRequest] = useState(false);
	useEffect(() => {
		if (target !== null) {
			target.scrollTo({ top });
		}
	}, [top, target, userInfo, request]);
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
				issues={issues}
				setIssues={setIssues}
				setTop={setTop}
				statsData={statsData}
				NewStatsForm={NewStatsForm}
			/>
			<Context>
				<Issues
					issues={issues}
					setIssues={setIssues}
					setPageChange={setPageChange}
					setTop={setTop}
					target={target}
					userInfo={userInfo}
					statsData={statsData}
					setRequest={setRequest}
					setSelectIssue={setSelectIssue}
					setSelectIssueNumber={setSelectIssueNumber}
				/>
			</Context>
		</Frame>
	);
}

export default IssuePage;
