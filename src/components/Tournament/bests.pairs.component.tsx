import React, { useEffect, useState } from 'react';
import { Carousel, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { StatsPairDTO } from 'src/@common/dto';
import { StatsBestPairsResponse } from 'src/@common/models';
import { fetchBestPairs } from 'src/redux/services/stats.service';
import { getLabel } from './helper';

type StatsType = {
	ever: Array<StatsPairDTO>;
	week: Array<StatsPairDTO>;
	month: Array<StatsPairDTO>;
};
const aWeekAgo = new Date();
aWeekAgo.setDate(aWeekAgo.getDate() - 7);
const aMonthAgo = new Date();
aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);

interface TheBestsProps {}
const TheBests: React.FC<TheBestsProps> = () => {
	const MAX_RESULT = 3;
	const { t } = useTranslation(['stats']);
	const [loaded, setLoaded] = useState<boolean>(false);
	const [stats, setStats] = useState<StatsType>();
	const [index, setIndex] = useState(0);
	const handleSelect = (selectedIndex: number, event: Record<string, unknown> | null) => {
		setIndex(selectedIndex);
	};
	useEffect(() => {
		if (!loaded) {
			(async () => {
				try {
					const { stats: ever } = (await fetchBestPairs({})) as StatsBestPairsResponse;
					const { stats: week } = (await fetchBestPairs({ from: aWeekAgo })) as StatsBestPairsResponse;
					const { stats: month } = (await fetchBestPairs({ from: aWeekAgo })) as StatsBestPairsResponse;
					setStats({ ever, week, month });
				} catch (error) {
					console.log('Error');
				} finally {
					setLoaded(true);
				}
			})();
		}
	}, [loaded]);

	const getPairs = (pairStats: Array<StatsPairDTO>, key: string) =>
		pairStats
			? pairStats
					.filter((v, i) => (pairStats.length >= MAX_RESULT ? i < MAX_RESULT : i > -1))
					.map((p) => (
						<p key={`${key}-${p.player1.id}`}>
							{getLabel(p.player1)} - {getLabel(p.player2)} | <strong>{p.totwin}</strong>
							<br />
						</p>
					))
			: null;

	return stats && Object.keys(stats).length > 0 ? (
		<Carousel activeIndex={index} onSelect={handleSelect}>
			{Object.keys(stats).map((key, ii) => (
				<Carousel.Item key={`${key}-${ii * 18}`} className="mb-4">
					<article>
						<h3>{t(`stats:${key}`)}</h3>
						<hr />
						{getPairs(stats[key as keyof StatsType], key)}
					</article>
				</Carousel.Item>
			))}
		</Carousel>
	) : null;
};

export default TheBests;
