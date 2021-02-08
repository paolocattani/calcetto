import React, { useEffect, useState } from 'react';
import { Carousel, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { StatsPairDTO, StatsPlayerDTO } from 'src/@common/dto';
import { StatsBestPairsResponse, StatsBestPlayersResponse } from 'src/@common/models';
import { formatDate, roundNumber } from 'src/@common/utils';
import { fetchBestPairs, fetchBestPlayers } from 'src/redux/services/stats.service';
import { LeftAngleIcon, RightAngleIcon } from '../core/icons';
import { getLabel } from './helper';

type StatsType<T> = {
	ever: Array<T>;
	week: Array<T>;
	month: Array<T>;
};
const aWeekAgo = new Date();
aWeekAgo.setDate(aWeekAgo.getDate() - 7);
const aMonthAgo = new Date();
aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);

interface TheBestsProps {}
// eslint-disable-next-line sonarjs/cognitive-complexity
const TheBests: React.FC<TheBestsProps> = () => {
	const MAX_RESULT = 4;
	const { t } = useTranslation(['stats']);
	const [loadedPair, setLoadedPair] = useState<boolean>(false);
	const [statsPair, setStatsPair] = useState<StatsType<StatsPairDTO>>();
	const [loadedPlayer, setLoadedPlayer] = useState<boolean>(false);
	const [statsPlayer, setStatsPlayer] = useState<StatsType<StatsPlayerDTO>>();
	const [index, setIndex] = useState(0);
	const handleSelect = (selectedIndex: number, event: Record<string, unknown> | null) => {
		setIndex(selectedIndex);
	};
	useEffect(() => {
		if (!loadedPair) {
			(async () => {
				try {
					const { stats: ever } = (await fetchBestPairs({})) as StatsBestPairsResponse;
					const { stats: week } = (await fetchBestPairs({ from: formatDate(aWeekAgo, '-') })) as StatsBestPairsResponse;
					const { stats: month } = (await fetchBestPairs({
						from: formatDate(aMonthAgo, '-'),
					})) as StatsBestPairsResponse;
					setStatsPair({ ever, week, month });
				} catch (error) {
					console.log('Error');
				} finally {
					setLoadedPair(true);
				}
			})();
		}
	}, [loadedPair]);
	useEffect(() => {
		if (!loadedPlayer) {
			(async () => {
				try {
					const { stats: ever } = (await fetchBestPlayers({})) as StatsBestPlayersResponse;
					const { stats: week } = (await fetchBestPlayers({
						from: formatDate(aWeekAgo, '-'),
					})) as StatsBestPlayersResponse;
					const { stats: month } = (await fetchBestPlayers({
						from: formatDate(aMonthAgo, '-'),
					})) as StatsBestPlayersResponse;
					setStatsPlayer({ ever, week, month });
				} catch (error) {
					console.log('Error');
				} finally {
					setLoadedPlayer(true);
				}
			})();
		}
	}, [loadedPlayer]);

	// https://www.w3schools.com/howto/howto_css_user_rating.asp
	const getPairs = (pairStats: Array<StatsPairDTO>, key: string) =>
		pairStats ? (
			<>
				<Row>
					<Col md={{ span: 2, offset: 2 }} style={{ textAlign: 'right' }}>
						{t('stats:pair')}
					</Col>
					<Col md="4" style={{ textAlign: 'left' }}>
						{t('stats:win_percentage')} ( {t(`stats:${key}`)} )
					</Col>
				</Row>
				{pairStats
					.filter((v, i) => (pairStats.length >= MAX_RESULT ? i < MAX_RESULT : i > -1))
					.sort(
						(p1, p2) =>
							roundNumber((p2.totwin / p2.totMatch) * 100, 1) - roundNumber((p1.totwin / p1.totMatch) * 100, 1)
					)
					.map((p, ii) => (
						<Row>
							<Col
								md={{ span: 2, offset: 2 }}
								style={{ textAlign: 'right', float: 'left', width: '15%', marginTop: '10px', fontSize: 'large' }}
							>
								<i>
									<strong>
										{getLabel(p.player1)} - {getLabel(p.player2)}
									</strong>
								</i>
							</Col>
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

	const getPlayers = (playerStats: Array<StatsPlayerDTO>, key: string) =>
		playerStats ? (
			<>
				<Row>
					<Col md={{ span: 2, offset: 2 }} style={{ textAlign: 'right' }}>
						{t('stats:player')}
					</Col>
					<Col md="4" style={{ textAlign: 'left' }}>
						{t('stats:win_percentage')} ( {t(`stats:${key}`)} )
					</Col>
				</Row>
				{playerStats
					.filter((v, i) => (playerStats.length >= MAX_RESULT ? i < MAX_RESULT : i > -1))
					.sort(
						(p1, p2) =>
							roundNumber((p2.totwin / p2.totMatch) * 100, 1) - roundNumber((p1.totwin / p1.totMatch) * 100, 1)
					)
					.map((p, ii) => (
						<Row>
							<Col
								md={{ span: 2, offset: 2 }}
								style={{ textAlign: 'right', float: 'left', width: '15%', marginTop: '10px', fontSize: 'large' }}
							>
								<i>
									<strong>{getLabel(p.player)}</strong>
								</i>
							</Col>
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

	return (statsPair && Object.keys(statsPair).length > 0) || (statsPlayer && Object.keys(statsPlayer).length > 0) ? (
		<Carousel
			touch
			activeIndex={index}
			onSelect={handleSelect}
			className="mt-3"
			prevIcon={<LeftAngleIcon size="3x" color="#343a40" />}
			nextIcon={<RightAngleIcon size="3x" color="#343a40" />}
		>
			{statsPair
				? Object.keys(statsPair).map((key, ii) =>
						statsPair[key as keyof StatsType<StatsPairDTO>].length > 0 ? (
							<Carousel.Item style={{ opacity: 1 }} className="mb-5" key={`${key}-${ii * 18}`} interval={5000}>
								{getPairs(statsPair[key as keyof StatsType<StatsPairDTO>], key)}
							</Carousel.Item>
						) : null
				  )
				: null}
			{statsPlayer
				? Object.keys(statsPlayer).map((key, ii) =>
						statsPlayer[key as keyof StatsType<StatsPlayerDTO>].length > 0 ? (
							<Carousel.Item style={{ opacity: 1 }} className="mb-5" key={`${key}-${ii * 18}`} interval={5000}>
								{getPlayers(statsPlayer[key as keyof StatsType<StatsPlayerDTO>], key)}
							</Carousel.Item>
						) : null
				  )
				: null}
		</Carousel>
	) : null;
};

export default TheBests;
