import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import HomeImg from '../../assets/images/IssueImage.png';
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
const NewsImg = styled.img`
	height: 50px;
`;
const InOutFrame = styled.div`
	display: flex;
	flex-direction: row-reverse;
	width: 200px;
	align-items: center;
	justify-content: flex-start;
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

function IssueNav() {
	const [isLogin, setIsLogin] = useState(false);
	const [fadein, setFadein] = useState<boolean>(false);
	const [editor, setEditor] = useState(false);
	const fadeinAnimate = () => {
		setFadein(true);
		setTimeout(() => setFadein(false), 2000);
	};

	const editorOnOff = () => {
		setEditor(true);
	};

	const onConfirm = () => {
		console.log('확인');
		setEditor(false);
	};

	const onCancel = () => {
		console.log('취소');
		setEditor(false);
	};

	return (
		<Frame>
			<LogoFrame>
				<Logo src={osoriLogo} />
			</LogoFrame>
			<Title>
				<NewsImg src={HomeImg} />
			</Title>
			<InOutFrame>
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
							fadeinAnimate();
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
				<EditorModal visible={editor} onConfirm={onConfirm} onCancel={onCancel} />
			</InOutFrame>
		</Frame>
	);
}

export default IssueNav;
