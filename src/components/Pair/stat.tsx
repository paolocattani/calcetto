import React, { CSSProperties } from 'react';
import { Badge, Col, Row, Table } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useTranslation } from 'react-i18next';
import { StatsPairDTO } from 'src/@common/dto/stats/stats.pairs.dto';

interface StatsBadgeProps {
	header: string;
	variant: Variant;
	stats: Array<number>;
}
const StatsBadge: React.FC<StatsBadgeProps> = ({ stats, variant, header }) => (
	<Col>
		<Row key={header + '0'} className="justify-content-center">
			<strong>{header}</strong>
		</Row>
		<hr />
		{stats.map((s, i) => (
			<Row key={header + i} className="justify-content-center">
				<Col>
					<Badge pill variant={variant}>
						{s}
					</Badge>
				</Col>
			</Row>
		))}
	</Col>
);

interface StatsPairProps {
	stats: StatsPairDTO;
}
const StatsPair: React.FC<StatsPairProps> = ({ stats }) => {
	const { t } = useTranslation(['stats']);
	const stage1 = t('stats:stage1');
	const stage2 = t('stats:stage2');
	const tot = t('stats:tot');

	const winnings = [stats.s1win, stats.s2win, stats.totwin];
	const defeats = [stats.s1def, stats.s2def, stats.totdef];
	const winningsPercentage = [stats.ratiotot, stats.ratiotot, stats.ratiotot];
	const defeatsPercentage = [stats.ratiotot, stats.ratiotot, stats.ratiotot];

	console.log('StatsPair : ', stats);
	const test1 = (
		<Row>
			<Col>
				<Row className="justify-content-center">
					<strong></strong>
				</Row>
				<hr />
				<Row>{stage1}</Row>
				<Row>{stage2}</Row>
				<Row>{tot}</Row>
			</Col>
			<StatsBadge variant="success" stats={winnings} header={t('stats:winnings')} />
			<StatsBadge variant="danger" stats={defeats} header={t('stats:defeats')} />
			<StatsBadge variant="success" stats={winningsPercentage} header={t('stats:ratio')} />
			<StatsBadge variant="danger" stats={defeatsPercentage} header={t('stats:ratio')} />
		</Row>
	);
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
