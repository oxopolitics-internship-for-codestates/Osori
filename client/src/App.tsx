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
	const [top, setTop] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	return (
		<Frame>
			{pageChange ? (
				<IssuePage setPageChange={setPageChange} top={top} setTop={setTop} pageChange={pageChange} />
			) : (
				<StaticPage setPageChange={setPageChange} isLoading={isLoading} setIsLoading={setIsLoading} />
			)}
			{isLoading ? <LoadingPage /> : null}
		</Frame>
	);
}

export default App;
