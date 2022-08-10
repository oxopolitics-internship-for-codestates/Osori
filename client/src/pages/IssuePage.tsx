import React, { useState } from 'react';
import styled from 'styled-components';
import IssueList from '../components/issues/Issues';
import IssueNav from '../components/issues/IssueNav';
import Dummyissues from '../etc/DummyIssue';
import TopImg from '../assets/images/up-arrow.png';

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
const Button2 = styled.button`
	position: absolute;
	right: calc(((100% - 1200px) / 2) + 60px);
	width: 50px;
	height: 50px;
`;

function IssuePage({
	pageChange,
	setPageChange,
	setTop,
	top,
}: {
	pageChange: boolean;
	top: number;
	setPageChange: React.Dispatch<React.SetStateAction<boolean>>;
	setTop: React.Dispatch<React.SetStateAction<number>>;
}) {
	const [issues, setIssues] = useState(Dummyissues);
	const [target, setTarget] = useState<(EventTarget & HTMLDivElement) | null>(null);
	const [isLogin, setIsLogin] = useState(false);
	useEffect(() => {
		if (target !== null) {
			target.scrollTo({ top });
		}
	}, [top, target]);
	return (
		<Frame
			onMouseOver={(e) => {
				if (target === null) {
					setTarget(e.currentTarget);
				}
			}}
		>
			<IssueNav />
			{isLogin ? <Button2>글쓰기</Button2> : null}
			{isLogin ? (
				<Button
					onClick={() => {
						setIsLogin(false);
					}}
				>
					로그아웃
				</Button>
			) : (
				<Button
					onClick={() => {
						setIsLogin(true);
					}}
				>
					로그인
				</Button>
			)}
			<Context>
				<IssueList issues={issues} setPageChange={setPageChange} setTop={setTop} target={target} />
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
