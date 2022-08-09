import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
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

function scroll() {
	const myElement: HTMLElement | null = document.getElementById('scroll');
	if (myElement !== null) {
		myElement.scrollTo(0, 0);
		console.log(myElement);
	}
	console.log('test');
}

function IssuePage({ setPageChange }: { setPageChange: React.Dispatch<React.SetStateAction<boolean>> }) {
	const [issues, setIssues] = useState(Dummyissues);

	return (
		<Frame id="scroll">
			<IssueNav />
			<Context>
				<IssueList issues={issues} setPageChange={setPageChange} />
			</Context>
			<TopButton onClick={scroll}>
				<TopImage src={TopImg} alt="" />
				Top
			</TopButton>
		</Frame>
	);
}

export default IssuePage;
