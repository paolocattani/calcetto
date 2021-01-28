import React, { CSSProperties } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Stats } from '../../@common/dto/stats/stats.dto';

interface StatsProps<T> {
	stats: T;
}

export default function Stats<T extends Stats>({ stats }: StatsProps<T>) {
	const { t } = useTranslation(['stats']);
	const stage1 = t('stats:stage1');
	const stage2 = t('stats:stage2');
	const tot = t('stats:tot');

	//console.log('StatsPair : ', stats);
	const darkBackGround: CSSProperties = {
		backgroundColor: 'var(--default-black)',
		color: 'whitesmoke',
	};
	return (
		<Table striped bordered hover>
			<thead>
				<tr
					style={{
						backgroundColor: 'cadetblue',
					}}
				>
					<td>#</td>
					<td>{stage1}</td>
					<td>{stage2}</td>
					<td>{tot}</td>
					<td>% {stage1}</td>
					<td>% {stage2}</td>
					<td>% {tot}</td>
				</tr>
			</thead>
			<tbody>
				<tr style={darkBackGround}>
					<td>{t('stats:winnings')}</td>
					<td>{stats.s1win}</td>
					<td>{stats.s2win}</td>
					<td>{stats.totwin}</td>
					<td>{stats.winS1Percentage}</td>
					<td>{stats.winS2Percentage}</td>
					<td>{stats.winPercentage}</td>
				</tr>
				<tr style={darkBackGround}>
					<td>{t('stats:defeats')}</td>
					<td>{stats.s1def}</td>
					<td>{stats.s2def}</td>
					<td>{stats.totdef}</td>
					<td>{stats.defS1Percentage}</td>
					<td>{stats.defS2Percentage}</td>
					<td>{stats.defPercentage}</td>
				</tr>
				<tr style={darkBackGround}>
					<td>{t('stats:tots')}</td>
					<td>{stats.totS1}</td>
					<td>{stats.totS2}</td>
					<td>{stats.totMatch}</td>
					<td>{stats.ratioS1}</td>
					<td>{stats.ratioS2}</td>
					<td>{stats.ratioTot}</td>
				</tr>
			</tbody>
		</Table>
	);
}
