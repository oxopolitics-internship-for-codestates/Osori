import React from 'react';
import styled from 'styled-components';
import IssueList from '../components/issues/Issues';
import IssueNav from '../components/issues/IssueNav';

const Frame = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

function IssuePage() {
	return (
		<Frame>
			<IssueNav />
			<IssueList />
		</Frame>
	);
}

export default IssuePage;
