import React from 'react';
import styled from 'styled-components';

const Frame = styled.div`
	border: 1px solid;
	border-radius: 20px 20px 20px 20px;
	padding: 20px;
`;

const Issue = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Topic = styled.div`
	font-size: 20px;
	font-weight: 900;
	margin-bottom: 20px;
`;

const Answer = styled.div`
	display: flex;
`;

const Ans1 = styled.div`
	border: 1px solid;
	border-radius: 10px 10px 10px 10px;
	padding: 0px 25px;
	margin-right: 50px;
	background-color: rgb(230, 230, 230);
	&:hover {
		background-color: #519b7a;
	}
	cursor: pointer;
`;

const Ans2 = styled.div`
	border: 1px solid;
	border-radius: 10px 10px 10px 10px;
	padding: 0px 10px;
	margin-right: 50px;
	background-color: rgb(230, 230, 230);
	&:hover {
		background-color: #fbcd57;
	}
	cursor: pointer;
`;

const Ans3 = styled.div`
	border: 1px solid;
	border-radius: 10px 10px 10px 10px;
	padding: 0px 10px;
	background-color: rgb(230, 230, 230);
	&:hover {
		background-color: #fb7b77;
	}
	cursor: pointer;
`;

const Examples = styled.div``;

const Example1 = styled.div`
	margin-top: 20px;
	margin-bottom: 5px;
`;

const Example101 = styled.span`
	letter-spacing: 30px;
	font-weight: 900;
`;

const Example102 = styled.span``;

const Example2 = styled.div`
	margin-bottom: 5px;
`;

const Example201 = styled.span`
	font-weight: 900;
`;

const Example202 = styled.span``;

const Example3 = styled.div`
	margin-bottom: 10px;
`;

const Example301 = styled.span`
	font-weight: 900;
`;

const Example302 = styled.span``;

const Confirm = styled.div`
	border: 1px solid;
	border-radius: 10px 10px 10px 10px;
	margin: auto 0 0 auto;
	padding: 5px;
	cursor: pointer;
`;

function Issues() {
	return (
		<Frame>
			<Issue>
				<Topic>외국어 고등학교 폐지 찬성하세요?</Topic>
				<Answer>
					<Ans1>네</Ans1>
					<Ans2>글쎄요</Ans2>
					<Ans3>아니요</Ans3>
				</Answer>
				<Examples>
					<Example1>
						<Example101>네</Example101>
						<Example102> : 외국어 고등학교 폐지해야 돼요.</Example102>
					</Example1>
					<Example2>
						<Example201>글쎄요</Example201>
						<Example202> : 잘 모르겠어요.</Example202>
					</Example2>
					<Example3>
						<Example301>아니요</Example301>
						<Example302> : 외국어 고등학교 폐지하면 안 돼요.</Example302>
					</Example3>
				</Examples>
				<Confirm>통계보기</Confirm>
			</Issue>
		</Frame>
	);
}

export default Issues;
