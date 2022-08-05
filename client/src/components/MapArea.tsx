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
	mapSel: (x: string) => string;
	region: string;
	regionSel: (x: string) => string;
	mdata: MapData;
	isClick: number;
	isClickF: (x: number) => number;
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
