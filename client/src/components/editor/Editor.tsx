import React from 'react';
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
	color: #3f3c3c;
	max-width: 300px;
	margin: 0 auto;
	margin-top: 30px;
	margin-bottom: 30px;
	font-size: 32px;
	font-weight: 900;
`;

const RegisterFormBlock = styled.div`
	width: 700px;
	height: 700px;
	background: #fff;
	border-radius: 16px;
	box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.3);
	margin-top: 180px;
	margin-bottom: 32px;
	padding: 30px;
	display: flex;
	flex-direction: column;
`;

const RowGroup = styled.div`
	font-size: 12px;
	min-width: 600px;
	max-width: 50%;
	margin: 0 auto;
`;

const Label = styled.h3<{ LabelFontS?: string }>`
	margin: 8px 8px 8px;
	height: 20px;
	font-size: ${({ LabelFontS }) => LabelFontS || '14px'};
	font-weight: 700;
`;

const ResponseInput = styled.input<{ EditorBorder?: string; EditorMarginB?: string; EditorShadow?: string }>`
	display: block;
	position: relative;
	width: 100%;
	height: 48px;
	border: ${({ EditorBorder }) => EditorBorder || '1px solid #dadada'};
	border-radius: 10px;
	margin-bottom: ${({ EditorMarginB }) => EditorMarginB || '0px'};
	padding: 10px 110px 10px 14px;
	box-sizing: border-box;
	&:disabled {
		background: #ffffffa6;
	}
	& + & {
		margin-left: 20px;
	}
	&:focus {
		outline: none;
	}
`;

const ResponseInputFrame = styled.div`
	border: 1px solid #eea3bf;
	padding: 5px 10px 20px 10px;
`;

const ConfirmDiv = styled.div`
	display: flex;
	margin-top: 15px;
`;

const ConfirmButton = styled.button<{ buttonColor?: string; buttonBackColor?: string; buttonLeft?: string }>`
	width: 300px;
	height: 45px;
	color: ${({ buttonColor }) => buttonColor || '#fff'};
	font-size: 19px;
	font-weight: 900;
	background: ${({ buttonBackColor }) => buttonBackColor || '#EEA3BF'};
	border: 1px solid #eea3bf;
	border-radius: 8px;
	position: absolute;
	left: ${({ buttonLeft }) => buttonLeft || '28%'};
	transform: translate(-50%, 50%);
	text-align: center;
	&:hover {
		opacity: 0.8;
	}
	&:active {
		opacity: 1;
	}
`;

// ---- code
interface Props {
	onConfirm: () => void;
	onCancel: () => void;
}

function Editor({ onConfirm, onCancel }: Props) {
	return (
		<Frame>
			<Inner>
				<RegisterFormBlock>
					<RowGroup>
						<Subject>이슈를 작성해주세요</Subject>
						<Label LabelFontS="18px">제목</Label>
						<ResponseInput EditorMarginB="50px" EditorBorder="1px solid #EEA3BF" type="text" />
						<Label LabelFontS="18px">응답</Label>
						<ResponseInputFrame>
							<Label>네</Label>
							<ResponseInput type="text" />
							<Label>글쎄요</Label>
							<ResponseInput type="text" />
							<Label>아니요</Label>
							<ResponseInput type="text" />
						</ResponseInputFrame>
						<ConfirmDiv>
							<ConfirmButton onClick={onConfirm}>저장</ConfirmButton>
							<ConfirmButton onClick={onCancel} buttonColor="#EEA3BF" buttonBackColor="#ffffff" buttonLeft="72%">
								취소
							</ConfirmButton>
						</ConfirmDiv>
					</RowGroup>
				</RegisterFormBlock>
			</Inner>
		</Frame>
	);
}

export default Editor;
