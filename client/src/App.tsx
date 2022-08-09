import React from 'react';
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
	overflow-y: scroll;
	&::-webkit-scrollbar {
		display: none;
	}
`;

function App() {
	return <Frame>{true ? <IssuePage /> : <StaticPage />}</Frame>;
}

export default App;
