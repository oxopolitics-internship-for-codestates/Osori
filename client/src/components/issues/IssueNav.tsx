import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import IssueImage from '../../assets/images/IssueImage.png';
import osoriLogo from '../../assets/images/osori-logo.png';
import EditorModal from '../editor/EditorModal';

const Frame = styled.div`
	width: 100%;
	height: 100px;
	position: fixed;
	background-color: white;
	display: flex;
	justify-content: space-around;
	align-items: center;
	border-bottom: 1px solid #dedede;
`;

const UpperFrame = styled.div`
	position: fixed;
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: space-around;
	align-items: center;
	z-index: 3;
`;

const LowerFrame = styled.div`
	position: fixed;
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: -3;
`;

const LogoFrame = styled.div`
	width: 150px;
`;

const Logo = styled.img`
	width: 100%;
	height: 50px;
`;

const Title = styled.span`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 150px;
`;

const IssueImg = styled.img`
	height: 50px;
`;

const InOutFrame = styled.div`
	display: flex;
	flex-direction: row-reverse;
	width: 400px;
	align-items: center;
	justify-content: flex-start;
`;

const Label = styled.div`
	margin-left: 5px;
	width: 150px;
	height: 50px;
	background-color: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #878787;
	font-size: 15px;
	font-weight: 600;
`;

const fadeinAni = keyframes`
  from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
`;

const Button = styled.button<{ color?: string; animate?: string }>`
	margin-left: 5px;
	width: 70px;
	height: 50px;
	background-color: #fff;
	opacity: 1;
	border-radius: 8px;
	border: 2px solid ${({ color }) => color || '#feddd5'};
	box-shadow: rgba(150, 143, 152, 0.15) 0 4px 9px;
	box-sizing: border-box;
	color: #666666;
	cursor: pointer;
	display: inline-block;
	font-size: 14px;
	font-weight: 600;
	letter-spacing: normal;
	animation: ${({ animate }) => animate || ''};
	animation-fill-mode: backwards;

	&:hover {
		background-color: ${({ color }) => color || '#feddd5'};
		opacity: 1;
		transform: translateY(0);
		transition-duration: 0.35s;
		color: #fff;
	}
`;

// ---- code ----
interface IssuesData {
	_id: string;
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
	answer: string;
}

interface DataType {
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
}

function IssueNav({
	userInfo,
	isLogin,
	setIsLogin,
	setUserInfo,
	setIssues,
	setTop,
}: {
	userInfo: { id: string; userName: string };
	isLogin: boolean;
	setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
	setUserInfo: React.Dispatch<React.SetStateAction<{ id: string; userName: string }>>;
	setIssues: React.Dispatch<React.SetStateAction<IssuesData[]>>;
	setTop: React.Dispatch<React.SetStateAction<number>>;
}) {
	const [fadein, setFadein] = useState<boolean>(false);
	const [editor, setEditor] = useState(false);

	const fadeinAnimate = () => {
		setFadein(true);
		setTimeout(() => setFadein(false), 2000);
	};

	const editorOnOff = () => {
		setEditor(true);
	};

	const onConfirm = (data: DataType) => {
		axios.post(`${process.env.REACT_APP_SERVER_URI}issue/`, { ...data, userId: userInfo.id }).then(() => {
			return axios.get(`${process.env.REACT_APP_SERVER_URI}issue/${userInfo.id}`).then((issues) => {
				setIssues(issues.data);
				setEditor(false);
				setTop(0);
			});
		});
	};

	const onCancel = () => {
		setEditor(false);
	};

	return (
		<Frame>
			<UpperFrame>
				<LogoFrame>
					<Logo src={osoriLogo} />
				</LogoFrame>
				<InOutFrame>
					{isLogin ? (
						<Button
							onClick={() => {
								return axios.get(`${process.env.REACT_APP_SERVER_URI}issue/`).then((issues) => {
									setIssues(issues.data);
									setUserInfo({ id: '', userName: '' });
									setIsLogin(false);
									setTop(0);
								});
							}}
						>
							로그아웃
						</Button>
					) : (
						<Button
							onClick={() => {
								axios.get(`${process.env.REACT_APP_SERVER_URI}user/`).then((user) => {
									//  eslint-disable-next-line no-underscore-dangle
									const userInfos = { id: user.data._id, userName: user.data.userName };
									return axios.get(`${process.env.REACT_APP_SERVER_URI}issue/${userInfos.id}`).then((issues) => {
										setIssues(issues.data);
										setUserInfo(userInfos);
										setIsLogin(true);
										fadeinAnimate();
										setTop(0);
									});
								});
							}}
							className={fadein ? 'fadein' : ''}
						>
							로그인
						</Button>
					)}
					{isLogin ? (
						<Button onClick={editorOnOff} color="#C1ADD1" animate="fadeinAni 0.5s">
							글쓰기
						</Button>
					) : null}
					{isLogin ? <Label>{`${userInfo.userName} 님`}</Label> : null}
					<EditorModal visible={editor} onConfirm={onConfirm} onCancel={onCancel} />
				</InOutFrame>
			</UpperFrame>
			<LowerFrame>
				<Title>
					<IssueImg src={IssueImage} />
				</Title>
			</LowerFrame>
		</Frame>
	);
}

export default IssueNav;
