import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

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

const colorSet = ['#9749B6', '#C181DB', '#C1ADD1', '#EEA3BF', '#FEDDD5', '#EAEAEA'];

interface RegionData {
	name: string;
	count: number;
	rate: number;
	color: string;
}

interface MapData {
	name: string;
	count: number;
	min: number;
	max: number;
	data: { [regionName: string]: RegionData };
}

interface RegionData2 {
	regionName: string;
	count: number;
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
	mapSel: React.Dispatch<React.SetStateAction<string>>;
	region: string;
	regionSel: React.Dispatch<React.SetStateAction<string>>;
	mdata: MapData;
	isClick: number;
	isClickF: React.Dispatch<React.SetStateAction<number>>;
}) {
	const [check, checkF] = useState(-1);
	const [data, dataF] = useState<MapData | null>(null);

	function mapUpdate(mapName: string) {
		return axios.get(`${process.env.REACT_APP_SERVER_URI}stats/map/${mapName}`).then((x) => {
			const mapdata: RegionData2[] = x.data;
			const sub: MapData = {
				name: '',
				count: 0,
				data: {},
				min: 100,
				max: 0,
			};
			sub.name = mapName;
			sub.count = mapdata.reduce((acc, md) => acc + md.count, 0);
			for (const { regionName, count } of mapdata) {
				const [scount, rate] = [count, Number(((100 * count) / sub.count).toFixed(2))];
				if (rate > sub.max) {
					sub.max = rate;
				}
				if (rate < sub.min) {
					sub.min = rate;
				}
				sub.data[`${regionName}`] = {
					name: regionName,
					count: scount,
					rate,
					color: '',
				};
			}
			const dx = (Math.log(sub.max) - Math.log(sub.min)) / 5;
			for (const { regionName } of mapdata) {
				const { rate } = sub.data[`${regionName}`];
				let k = 5 - Math.floor((Math.log(rate) - Math.log(sub.min)) / dx);
				k = k < 0 ? 0 : k;
				sub.data[`${regionName}`].color = colorSet[k];
			}
			dataF(sub);
		});
	}
	if (data === null) {
		mapUpdate(map);
	}
	return (
		<Frame>
			{data !== null ? (
				<InnerFrame>
					<ButtonArea>
						<ButtonBox>
							<Button
								direc="L"
								check={map === '전국'}
								onClick={() => {
									if (isClick >= 0 && map !== '전국') {
										mapUpdate('전국').then(() => {
											mapSel('전국');
											regionSel('');
											isClickF(-1);
										});
										// dataF(null);
									} else if (isClick < 0) {
										mapUpdate('전국').then(() => {
											mapSel('전국');
										});
										// mapSel("전국");
										// dataF(null);
									}
								}}
							>
								전국
							</Button>

							<Button
								direc="R"
								check={map === '서울특별시'}
								onClick={() => {
									if (isClick >= 0 && map !== '서울특별시') {
										mapUpdate('서울특별시').then(() => {
											mapSel('서울특별시');
											regionSel('');
											isClickF(-1);
										});
										// dataF(null);
									} else if (isClick < 0) {
										mapUpdate('서울특별시').then(() => {
											mapSel('서울특별시');
										});
										// mapSel("서울특별시");
										// dataF(null);
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
									{`${data.data[region].count} 명`}
									<br />
									{`${data.data[region].rate}%`}
								</SelRegionBox>
							) : (
								<SelRegionBox>
									{data.name}
									<br />
									{`${data.count} 명`}
									<br />
									100%
								</SelRegionBox>
							)}
							{map === '전국' ? (
								<Korea
									width="100%"
									height="100%"
									newData={data}
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
									newData={data}
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
			) : null}
		</Frame>
	);
}

export default MapArea;
