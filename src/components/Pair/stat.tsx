import React from 'react';
import { Badge, Col, Row } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useTranslation } from 'react-i18next';
import { StatsPairDTO } from 'src/@common/dto/stats/stats.pairs.dto';

interface StatMapper {
	label: string;
	value: number;
}

interface StatsBadgeProps {
	header: string;
	variant: Variant;
	stats: Array<StatMapper>;
}
const StatsBadge: React.FC<StatsBadgeProps> = ({ stats, variant, header }) => (
	<Col>
		<Row key={header + '0'} className="justify-content-center">
			<strong>{header}</strong>
		</Row>
		<hr />
		{stats.map((s, i) => (
			<Row key={header + s.label} className="justify-content-center">
				<Col>{s.label}</Col>
				<Col>
					<Badge pill variant={variant}>
						{s.value}
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
	const winnings = [
		{ label: stage1, value: stats.s1win },
		{ label: stage2, value: stats.s2win },
		{ label: tot, value: stats.totwin },
	];

	const defeats = [
		{ label: stage1, value: stats.s1def },
		{ label: stage2, value: stats.s2def },
		{ label: tot, value: stats.totdef },
	];

	const ratio = [
		{ label: stage1, value: stats.ratiotot },
		{ label: stage2, value: stats.ratiotot },
		{ label: tot, value: stats.ratiotot },
	];

	console.log('StatsPair : ', stats);
	return (
		<Row>
			<StatsBadge variant="success" stats={winnings} header={t('stats:winnings')} />
			<StatsBadge variant="danger" stats={defeats} header={t('stats:defeats')} />
			<StatsBadge variant="warning" stats={ratio} header={t('stats:ratio')} />
		</Row>
	);
};

export default StatsPair;
