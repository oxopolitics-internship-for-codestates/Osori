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

function Editor() {
	return (
		<Frame>
			<Inner>
				<Subject>작성 하기</Subject>
				<RegisterFormBlock>
					<RowGroup>
						<EditorTitle>제목</EditorTitle>
						<EditorTitleInput type="text" />
						<EditorTitle>네</EditorTitle>
						<EditorTitleInput type="text" />
						<EditorTitle>글쎄요</EditorTitle>
						<EditorTitleInput type="text" />
						<EditorTitle>아니요</EditorTitle>
						<EditorTitleInput type="text" />
					</RowGroup>
				</RegisterFormBlock>
			</Inner>
		</Frame>
	);
}

export default Editor;
