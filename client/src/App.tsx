import React, { useState } from 'react';
import styled from 'styled-components';
import MakeNewMockForm from './etc/MakeNewMockForm';
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
const { issuedata: MockIssue, statsdata: MockStats } = MockupMaker();
interface DataForm {
	id: string;
	title: string;
	answerTextO: string;
	answerTextX: string;
	answerTextS: string;
	answer?: string;
}

interface Answer {
	yes: number;
	no: number;
	so: number;
}

interface Gender {
	count: number;
	answer: Answer;
	age: Age;
}
interface Age {
	count: number;
	[key: string]: number;
}

interface SubData {
	name: string;
	count: number;
	male: Gender;
	female: Gender;
}
interface SmData {
	[key: string]: SubData;
}

interface MapData {
	name: string;
	count: number;
	data: SmData;
}

interface DbData {
	[key: string]: MapData;
}
interface Tdata {
	[key: string]: DbData;
}
function NewStatsForm(id: string) {
	MockStats[id] = MakeNewMockForm();
}

function App() {
	const [pageChange, setPageChange] = useState(true);
	const [top, setTop] = useState(0);
	const [isLogin, setIsLogin] = useState(false);
	const [userInfo, setUserInfo] = useState({ userName: '', id: '' });
	const [issues, setIssues] = useState<DataForm[]>(MockIssue);
	const [isLoading, setIsLoading] = useState(false);
	const [selectIssue, setSelectIssue] = useState('');
	const [selectIssueNumber, setSelectIssueNumber] = useState(-1);

	return (
		<Frame>
			{pageChange ? (
				<IssuePage
					issues={issues}
					setIssues={setIssues}
					setPageChange={setPageChange}
					top={top}
					setTop={setTop}
					isLogin={isLogin}
					setIsLogin={setIsLogin}
					userInfo={userInfo}
					setUserInfo={setUserInfo}
					setSelectIssue={setSelectIssue}
					setSelectIssueNumber={setSelectIssueNumber}
					statsData={MockStats}
					NewStatsForm={NewStatsForm}
				/>
			) : (
				<StaticPage
					setPageChange={setPageChange}
					isLoading={isLoading}
					setIsLoading={setIsLoading}
					selectIssue={selectIssue}
					statsData={MockStats[selectIssue]}
				/>
			)}
			{isLoading ? <LoadingPage /> : null}
		</Frame>
	);
}

export default App;
