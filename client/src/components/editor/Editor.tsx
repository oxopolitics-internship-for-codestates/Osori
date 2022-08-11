import React, { useState } from 'react';
import styled from 'styled-components';

const Frame = styled.section`
	position: relative;
	margin-bottom: 200px;
`;

const Inner = styled.div`
	max-width: 980px;
	margin: 0 auto;
	position: relative;
	box-sizing: border-box;
`;

const Subject = styled.div`
	text-align: center;
	color: #c6c1c1;
	max-width: 220px;
	margin: 0 auto;
	margin-top: 30px;
	font-size: 32px;
`;

const RegisterFormBlock = styled.div`
	width: 700px;
	height: 500px;
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
	margin-top: 30px;
	margin-bottom: 32px;
	padding: 30px;
	display: flex;
	flex-direction: column;
`;

const RowGroup = styled.div`
	font-family: Dotum, '돋움', Helvetica, sans-serif;
	font-size: 12px;
	min-width: 600px;
	max-width: 50%;
	margin: 0 auto;
`;

const EditorTitle = styled.h3`
	margin: 19px 8px 8px;
	font-size: 14px;
	font-weight: 700;
`;

const EditorTitleInput = styled.input`
	display: block;
	position: relative;
	width: 100%;
	height: 51px;
	border: solid 1px #dadada;
	padding: 10px 110px 10px 14px;
	box-sizing: border-box;
	&:disabled {
		background: #ffffff;
	}
	& + & {
		margin-left: 20px;
	}
`;

const ConfirmDiv = styled.div`
	display: flex;
`;

const ConfirmButton = styled.button<{ buttonColor?: string; buttonBackColor?: string; buttonLeft?: string }>`
	width: 80px;
	height: 30px;
	color: ${({ buttonColor }) => buttonColor || '#fff'};
	background: ${({ buttonBackColor }) => buttonBackColor || '#00000069'};
	border: 1px solid #000;
	border-radius: 8px;
	position: absolute;
	left: ${({ buttonLeft }) => buttonLeft || '43%'};
	transform: translate(-50%, 50%);
	text-align: center;
	&:hover {
		opacity: 0.8;
		text-decoration: underline;
	}
	&:active {
		opacity: 1;
	}
`;
const MessageBoxArea = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	display: flex;

	justify-content: center;
	align-items: center;
`;

const MessageBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100px;
	width: 60%;
	flex-direction: column;
	min-width: 500px;
	opacity: 1;
	border: solid 1px black;
	border-radius: 10px;
	background-color: white;
	box-shadow: 5px 5px 10px black;
`;
const MessageInnerBox = styled.div`
	flex: 1 0 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const MessageBoxButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
`;

// ---- code
interface Props {
	onConfirm: (data: DataType) => void;
	onCancel: () => void;
}

interface DataType {
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
}
const dataInit: DataType = {
	title: '',
	answerTextO: '',
	answerTextX: '',
	answerTextS: '',
};

function Editor({ onConfirm, onCancel }: Props) {
	const [data, setData] = useState<DataType>(dataInit);
	const [inputError, setInputError] = useState(false);
	function Checker(checkData: DataType) {
		let ans = true;
		const f = (s: string) => s.replaceAll(' ', '').length === 0;
		if (f(checkData.title)) {
			ans = false;
		}

		if (f(checkData.answerTextO)) {
			ans = false;
		}

		if (f(checkData.answerTextS)) {
			ans = false;
		}

		if (f(checkData.answerTextX)) {
			ans = false;
		}

		return ans;
	}

	return (
		<Frame>
			<Inner>
				<Subject>작성 하기</Subject>
				<RegisterFormBlock>
					<RowGroup>
						<EditorTitle>제목</EditorTitle>
						<EditorTitleInput
							type="text"
							value={data.title}
							onChange={(e) => {
								setData({ ...data, title: e.target.value });
							}}
						/>
						<EditorTitle>네</EditorTitle>
						<EditorTitleInput
							type="text"
							value={data.answerTextO}
							onChange={(e) => {
								setData({ ...data, answerTextO: e.target.value });
							}}
						/>
						<EditorTitle>글쎄요</EditorTitle>
						<EditorTitleInput
							type="text"
							value={data.answerTextS}
							onChange={(e) => {
								setData({ ...data, answerTextS: e.target.value });
							}}
						/>
						<EditorTitle>아니요</EditorTitle>
						<EditorTitleInput
							type="text"
							value={data.answerTextX}
							onChange={(e) => {
								setData({ ...data, answerTextX: e.target.value });
							}}
						/>
						<ConfirmButton
							onClick={() => {
								console.log(Checker(data));
								if (Checker(data)) {
									onConfirm(data);
								} else {
									setInputError(true);
									setData(dataInit);
								}
							}}
						>
							확인
						</ConfirmButton>
						<ConfirmButton onClick={onCancel} buttonColor="#000" buttonBackColor="#ffffff" buttonLeft="58%">
							취소
						</ConfirmButton>
					</RowGroup>
				</RegisterFormBlock>
			</Inner>
			{inputError ? (
				<MessageBoxArea>
					<MessageBox>
						<MessageInnerBox>다시 입력 해주세요.</MessageInnerBox>
						<MessageInnerBox>
							<MessageBoxButton
								onClick={() => {
									setInputError(false);
								}}
							>
								돌아가기
							</MessageBoxButton>
						</MessageInnerBox>
					</MessageBox>
				</MessageBoxArea>
			) : null}
		</Frame>
	);
}

export default Editor;
