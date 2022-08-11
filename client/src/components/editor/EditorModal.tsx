import React, { useState, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Editor from './Editor';

export const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1
  }
  to {
    opacity: 0
  }
`;

export const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

export const slideDown = keyframes`
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(200px);
  }
`;

export const ModalBackdrop = styled.div<{ disappear?: boolean }>`
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(0, 0, 0, 0.8);
	animation-duration: 0.25s;
	animation-timing-function: ease-out;
	animation-name: ${fadeIn};
	animation-fill-mode: forwards;
	${({ disappear }) =>
		disappear &&
		css`
			animation-name: ${fadeOut};
		`}
`;

export const ModalView = styled.div<{ disappear?: boolean }>`
	border-radius: 2px;
	animation-duration: 0.25s;
	animation-timing-function: ease-out;
	animation-name: ${slideUp};
	animation-fill-mode: forwards;
	${(props) =>
		props.disappear &&
		css`
			animation-name: ${slideDown};
		`}
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
	bottom: 30%;
	&:hover {
		opacity: 0.8;
		text-decoration: underline;
	}
	&:active {
		opacity: 1;
	}
`;
interface DataType {
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
}
interface Props {
	onConfirm: (data: DataType) => void;
	onCancel: () => void;
	visible: boolean;
}

function EditorModal({ onConfirm, onCancel, visible }: Props) {
	const [animate, setAnimate] = useState(false);
	const [localVisible, setLocalVisible] = useState(visible);

	useEffect(() => {
		if (localVisible && !visible) {
			setAnimate(true);
			setTimeout(() => setAnimate(false), 250);
		}
		setLocalVisible(visible);
	}, [localVisible, visible]);
	if (!animate && !localVisible) return null;
	return (
		<ModalBackdrop disappear={!visible}>
			<ModalView>
				<Editor onConfirm={onConfirm} onCancel={onCancel} />
			</ModalView>
		</ModalBackdrop>
	);
}

export default EditorModal;
