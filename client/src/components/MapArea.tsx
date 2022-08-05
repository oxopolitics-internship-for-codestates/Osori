import axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';
import randomPick from '../etc/randomPick';

import ColorBar from './ColorBar';
import Korea from './map/Korea';
import Seoul from './map/Seoul';

const Frame = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const InnerFrame = styled.div`
	height: 90%;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const ButtonArea = styled.div`
	height: 80px;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const ButtonBox = styled.div`
	display: flex;
`;
const Button = styled.button<{ direc: string; check: boolean }>`
	user-select: none;
	height: 100%;
	width: 200px;
	display: flex;
	padding: 5px;
	justify-content: center;
	align-items: center;
	border: solid 1px #7c7c7c;
	font-weight: 700;
	${({ direc }) => {
		if (direc === 'L') {
			return `
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      `;
		}
		return `
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      `;
	}}
	${({ check }) => {
		if (check) {
			return `
      color: white;
      background-color: #C181DB;
      `;
		}
		return `

      `;
	}}
`;

const MainArea = styled.div`
	height: 90%;
	width: 100%;
	display: flex;
`;
const MapBox = styled.div`
	height: 100%;
	max-width: 545px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-end;
	padding: 5px;
`;

const SelRegionBox = styled.div`
	position: absolute;
	height: 100px;
	width: 150px;
	display: flex;
	margin: 5px;
	justify-content: center;
	align-items: center;
	text-align: center;
	border-radius: 20px;
	border: solid 2px #7c7c7c;
	box-shadow: 0px 0px 5px #7c7c7c;
	background-color: white;
	user-select: none;
`;

const ColorBarBox = styled.div`
	height: 100%;
	width: 50px;
`;

const names: { [key: string]: string[] } = {
	전국: [
		'서울특별시',
		'부산광역시',
		'대구광역시',
		'인천광역시',
		'광주광역시',
		'대전광역시',
		'울산광역시',
		'경기도',
		'강원도',
		'충청북도',
		'충청남도',
		'전라북도',
		'전라남도',
		'경상북도',
		'경상남도',
		'제주특별자치도',
		'세종특별자치시',
	],
	서울: [
		'종로구',
		'중구',
		'용산구',
		'성동구',
		'광진구',
		'동대문구',
		'중랑구',
		'성북구',
		'강북구',
		'도봉구',
		'노원구',
		'은평구',
		'서대문구',
		'마포구',
		'양천구',
		'강서구',
		'구로구',
		'금천구',
		'영등포구',
		'동작구',
		'관악구',
		'서초구',
		'강남구',
		'송파구',
		'강동구',
	],
};

const colorSet = ['#9749B6', '#C181DB', '#C1ADD1', '#EEA3BF', '#FEDDD5', '#EAEAEA'];
function RdColor() {
	const k = Math.floor(6 * Math.random());
	return k > 5 ? 5 : k;
}

interface regionData {
	name: string;
	count: number;
	rate: number;
	color: string;
}

interface mapData {
	name: string;
	count: number;
	min: number;
	max: number;
	data: { [regionName: string]: regionData };
}

function MapArea({
	map,
	mapSel,
	region,
	regionSel,
	mdata,
	isClick,
	isClickF,
}: {
	map: string;
	mapSel: Function;
	region: string;
	regionSel: Function;
	mdata: mapData;
	isClick: number;
	isClickF: Function;
}) {
	const [check, checkF] = useState(-1);

	return (
		<Frame>
			<InnerFrame>
				<ButtonArea>
					<ButtonBox>
						<Button
							direc="L"
							check={map === '전국'}
							onClick={() => {
								if (isClick >= 0 && map !== '전국') {
									mapSel('전국');
									regionSel('');
									isClickF(-1);
								} else if (isClick < 0) {
									mapSel('전국');
								}
							}}
						>
							전국
						</Button>

						<Button
							direc="R"
							check={map === '서울'}
							onClick={() => {
								if (isClick >= 0 && map !== '서울') {
									mapSel('서울');
									regionSel('');
									isClickF(-1);
								} else if (isClick < 0) {
									mapSel('서울');
								}
							}}
						>
							서울
						</Button>
					</ButtonBox>
				</ButtonArea>
				<MainArea>
					<MapBox>
						{region.length > 0 ? (
							<SelRegionBox>
								{region}
								<br />
								{`${mdata.data[region].count} 명`}
								<br />
								{`${mdata.data[region].rate}%`}
							</SelRegionBox>
						) : (
							<SelRegionBox>
								{mdata.name}
								<br />
								{`${mdata.count} 명`}
								<br />
								100%
							</SelRegionBox>
						)}
						{map === '전국' ? (
							<Korea
								width="100%"
								height="100%"
								newData={mdata}
								selrf={regionSel}
								isClick={isClick}
								isClickF={isClickF}
								check={check}
								checkF={checkF}
							/>
						) : (
							<Seoul
								width="100%"
								height="100%"
								newData={mdata}
								selrf={regionSel}
								isClick={isClick}
								isClickF={isClickF}
								check={check}
								checkF={checkF}
							/>
						)}
					</MapBox>
					<ColorBarBox>
						<ColorBar />
					</ColorBarBox>
				</MainArea>
			</InnerFrame>
		</Frame>
	);
}

export default MapArea;
