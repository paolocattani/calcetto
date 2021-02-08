import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PlayerDTO, StatsPairDTO, StatsPlayerDTO } from 'src/@common/dto';
import { StatsBestPairsResponse, StatsBestPlayersResponse } from 'src/@common/models';
import { fetchBestPairs, fetchBestPlayers } from 'src/redux/services/stats.service';

type StatsType = {
	pairs: { ever: Array<StatsPairDTO>; week: Array<StatsPairDTO> };
	players: { ever: Array<StatsPlayerDTO>; week: Array<StatsPlayerDTO> };
};
const aWeekAgo = new Date();
aWeekAgo.setDate(aWeekAgo.getDate() - 7);

interface TheBestsProps {}
// eslint-disable-next-line sonarjs/cognitive-complexity
const TheBests: React.FC<TheBestsProps> = () => {
	const MAX_RESULT = 3;
	const { t } = useTranslation(['stats']);
	const [loaded, setLoaded] = useState<boolean>(false);
	const [stats, setStats] = useState<StatsType>();
	useEffect(() => {
		if (!loaded) {
			(async () => {
				try {
					const { stats: bestPairsEver } = (await fetchBestPairs({})) as StatsBestPairsResponse;
					const { stats: bestPairsWeek } = (await fetchBestPairs({ from: aWeekAgo })) as StatsBestPairsResponse;
					const { stats: bestPlayerEver } = (await fetchBestPlayers({})) as StatsBestPlayersResponse;
					const { stats: bestPlayerWeek } = (await fetchBestPlayers({ from: aWeekAgo })) as StatsBestPlayersResponse;
					const model = {
						pairs: { ever: bestPairsEver, week: bestPairsWeek },
						players: { ever: bestPlayerEver, week: bestPlayerWeek },
					};
					console.log('useEffect : ', model);
					setStats(model);
				} catch (error) {
					console.log('Error');
				} finally {
					setLoaded(true);
				}
			})();
		}
	}, [loaded]);

	const getLabel = (player: PlayerDTO) => (player.alias ? player.alias : `${player.name} ${player.surname}`);
	const getPairs = (pairStats: Array<StatsPairDTO>, key: string) =>
		pairStats
			? pairStats
					.filter((v, i) => (pairStats.length >= MAX_RESULT ? i < MAX_RESULT : i > -1))
					.map((p) => (
						<p key={`${key}-${p.player1.id}`}>
							<code>
								{getLabel(p.player1)} - {getLabel(p.player2)}
							</code>
							<br />
						</p>
					))
			: 'not found';

	return (
		<>
			{stats && stats.pairs && (stats.pairs.ever || stats.pairs.week) ? (
				<article>
					<h2>{t('stats:best_pairs_ever')}</h2>
					<Col>{getPairs(stats.pairs.ever, 'ever')}</Col>
					<Col>{getPairs(stats.pairs.week, 'week')}</Col>
				</article>
			) : null}
		</>
	);
};

export default TheBests;
