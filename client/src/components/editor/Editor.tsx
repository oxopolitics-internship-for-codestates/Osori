import React, { useState } from 'react';
import styled from 'styled-components';

const Frame = styled.section`
	position: relative;
`;

const Inner = styled.div`
	max-width: 980px;
	margin: 0 auto;
	position: relative;
	box-sizing: border-box;
`;

const Subject = styled.div`
	text-align: center;
	color: #767676;
	max-width: 220px;
	margin: 0 auto;
	margin-top: 30px;
	font-size: 32px;
`;

const RegisterFormBlock = styled.div`
	width: 700px;
	height: 768px;

	position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
	background: white;
	border-radius: 16px;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
	margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
	margin-top: 30px;
	margin-bottom: 32px;
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
	margin: 19px 0 8px;
	font-size: 14px;
	font-weight: 700;
`;

const EditorTitleInput = styled.input``;

const ConfirmDiv = styled.div``;

const ConfirmButton = styled.button``;

function Editor() {
	return (
		<Frame>
			<Inner>
				<Subject>작성 하기</Subject>
				<RegisterFormBlock>
					<RowGroup>
						<EditorTitle>제목</EditorTitle>
						<EditorTitleInput />
						<EditorTitle>네</EditorTitle>
						<EditorTitleInput />
						<EditorTitle>글쎄요</EditorTitle>
						<EditorTitleInput />
						<EditorTitle>아니요</EditorTitle>
						<EditorTitleInput />
						<ConfirmDiv>
							<ConfirmButton>확인</ConfirmButton>
							<ConfirmButton>취소</ConfirmButton>
						</ConfirmDiv>
					</RowGroup>
				</RegisterFormBlock>
			</Inner>
		</Frame>
	);
}

export default Editor;
