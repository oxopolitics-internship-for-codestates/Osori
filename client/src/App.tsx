import React, { useState } from 'react';
import styled from 'styled-components';
import MockupMaker from './etc/MockupMaker';
import IssuePage from './pages/IssuePage';
import LoadingPage from './pages/LoadingPage';
import StaticPage from './pages/StaticPage';

const Frame = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const MockData = MockupMaker();

function App() {
	const [pageChange, setPageChange] = useState(true);
	const [top, setTop] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [selectIssue, setSelectIssue] = useState('');
	const [selectIssueNumber, setSelectIssueNumber] = useState(-1);
	return (
		<Frame>
			{pageChange ? (
				<IssuePage
					setPageChange={setPageChange}
					top={top}
					setTop={setTop}
					setSelectIssue={setSelectIssue}
					setSelectIssueNumber={setSelectIssueNumber}
					issuesData={MockData}
				/>
			) : (
				<StaticPage
					setPageChange={setPageChange}
					isLoading={isLoading}
					setIsLoading={setIsLoading}
					selectIssue={selectIssue}
					statsData={MockData[selectIssueNumber].statsdata}
				/>
			)}
			{isLoading ? <LoadingPage /> : null}
		</Frame>
	);
}

export default App;
