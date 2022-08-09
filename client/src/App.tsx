import React, { useState } from 'react';
import styled from 'styled-components';
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

function App() {
	const [pageChange, setPageChange] = useState(true);

	return (
		<Frame>
			{pageChange ? <IssuePage setPageChange={setPageChange} /> : <StaticPage setPageChange={setPageChange} />}
		</Frame>
	);
}

export default App;
