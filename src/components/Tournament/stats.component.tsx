import React, { useEffect, useState } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { StatsPairDTO, StatsPlayerDTO } from 'src/@common/dto';
import { OmitGeneric, StatsSummaryResponse } from 'src/@common/models';
import { roundNumber } from 'src/@common/utils';
import { fetchStatsSummary } from 'src/redux/services/stats.service';
import { LeftAngleIcon, RightAngleIcon } from '../core/icons';
import { getLabel } from './helper';
import logger from '../../@common/utils/logger.utils';

interface StatsSummaryProps {}
// eslint-disable-next-line sonarjs/cognitive-complexity
const StatsSummary: React.FC<StatsSummaryProps> = () => {
	const MAX_RESULT = 4;
	const { t } = useTranslation(['stats']);
	const [loaded, setLoaded] = useState<boolean>(false);
	const [stats, setStats] = useState<OmitGeneric<StatsSummaryResponse>>();
	const [index, setIndex] = useState(0);
	const handleSelect = (selectedIndex: number) => {
		setIndex(selectedIndex);
	};

	useEffect(() => {
		if (!loaded) {
			(async () => {
				try {
					const { players, pairs } = (await fetchStatsSummary()) as StatsSummaryResponse;
					setStats({ players, pairs });
				} catch (error) {
					logger.info('Error');
				} finally {
					setLoaded(true);
				}
			})();
		}
	}, [loaded]);

	// https://www.w3schools.com/howto/howto_css_user_rating.asp
	const getStats = (pairStats: Array<StatsPairDTO | StatsPlayerDTO>, key: string, type: string) =>
		pairStats ? (
			<>
				<Row>
					<Col md={{ span: 2, offset: 2 }} style={{ textAlign: 'right' }}>
						{t(`stats:${type}`)}
					</Col>
					<Col md="4" style={{ textAlign: 'left' }}>
						{t('stats:win_percentage')} ( {t(`stats:${key}`)} )
					</Col>
				</Row>
				{pairStats
					// just pick the first MAX_RESULT stats
					.filter((v, i) => (pairStats.length >= MAX_RESULT ? i < MAX_RESULT : i > -1))
					// Sort by winnnings percentage
					.sort(
						(p1, p2) =>
							roundNumber((p2.totwin / p2.totMatch) * 100, 1) - roundNumber((p1.totwin / p1.totMatch) * 100, 1)
					)
					.map((p, ii) => (
						// eslint-disable-next-line react/no-array-index-key
						<Row key={`key-${ii}`}>
							{/* 1st col : Pair/Player name */}
							<Col
								md={{ span: 2, offset: 2 }}
								style={{ textAlign: 'right', float: 'left', width: '15%', marginTop: '10px', fontSize: 'large' }}
							>
								<i>
									<strong>
										{type === 'pairs'
											? `${getLabel((p as StatsPairDTO).player1)} - ${getLabel((p as StatsPairDTO).player2)}`
											: getLabel((p as StatsPlayerDTO).player)}
									</strong>
								</i>
							</Col>
							{/* 2nd col : winnings percentage ( rappresentation ) */}
							<Col md="4" style={{ marginTop: '10px', float: 'left', width: '70%' }}>
								<div style={{ width: '100%', backgroundColor: '#f1f1f1', textAlign: 'center', color: 'white' }}>
									<div
										style={{
											width: `${roundNumber((p.totwin / p.totMatch) * 100, 1)}%`,
											height: '18px',
											backgroundColor: '#ffc107',
										}}
									></div>
								</div>
							</Col>
							{/* 3rd col : winnings percentage ( number ) */}
							<Col
								md={{ span: 2 }}
								style={{ textAlign: 'left', float: 'left', width: '15%', marginTop: '10px', fontSize: 'large' }}
							>
								{roundNumber((p.totwin / p.totMatch) * 100, 1)}%
							</Col>
						</Row>
					))}
			</>
		) : null;

	return stats && (stats.pairs || stats.players) ? (
		<Carousel
			touch
			activeIndex={index}
			onSelect={handleSelect}
			className="mt-3"
			prevIcon={<LeftAngleIcon size="3x" color="#343a40" />}
			nextIcon={<RightAngleIcon size="3x" color="#343a40" />}
		>
			{Object.keys(stats).map((type, ii) => {
				const s1 = stats[type as 'pairs' | 'players'];
				return Object.keys(s1).map((key) => {
					const s2 = s1[key as 'ever' | 'month' | 'week'];
					return s2.length > 0 ? (
						<Carousel.Item style={{ opacity: 1 }} className="mb-5" key={`${key}-${ii * 18}`} interval={5000}>
							{getStats(s2, key, type)}
						</Carousel.Item>
					) : null;
				});
			})}
		</Carousel>
	) : null;
};

export default StatsSummary;
