import React, { CSSProperties } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { StatsPairDTO } from 'src/@common/dto/stats/stats.pairs.dto';

interface StatsPairProps {
	stats: StatsPairDTO;
}
const StatsPair: React.FC<StatsPairProps> = ({ stats }) => {
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
					<td>% Fase 1</td>
					<td>% Fase 2</td>
					<td>% Totale</td>
				</tr>
			</thead>
			<tbody>
				<tr style={darkBackGround}>
					<td>Vittorie</td>
					<td>{stats.s1win}</td>
					<td>{stats.s2win}</td>
					<td>{stats.totwin}</td>
					<td>{stats.winS1Percentage}</td>
					<td>{stats.winS2Percentage}</td>
					<td>{stats.winPercentage}</td>
				</tr>
				<tr style={darkBackGround}>
					<td>Sconfitte</td>
					<td>{stats.s1def}</td>
					<td>{stats.s2def}</td>
					<td>{stats.totdef}</td>
					<td>{stats.defS1Percentage}</td>
					<td>{stats.defS2Percentage}</td>
					<td>{stats.defPercentage}</td>
				</tr>
				<tr style={darkBackGround}>
					<td>Totali</td>
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
};

export default StatsPair;
