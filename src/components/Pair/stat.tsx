import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { StatsPairDTO } from 'src/@common/dto/stats/stats.pairs.dto';

interface StatsPairProps {
	stats: StatsPairDTO;
}
const StatsPair: React.FC<StatsPairProps> = ({ stats }) => {
	return (
		<Row>
			<Col>
				<p>{stats.s1win}</p>
				<p>{stats.s2win}</p>
				<p>{stats.totwin}</p>
			</Col>
			<Col>
				<p>{stats.s1def}</p>
				<p>{stats.s2def}</p>
				<p>{stats.totdef}</p>
			</Col>
			<Col>
				<p>{stats.ratiotot}</p>
			</Col>
		</Row>
	);
};

export default StatsPair;
