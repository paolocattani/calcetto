import React from 'react';
import { SyntheticEvent } from 'react';
import { ExpandRowProps } from 'react-bootstrap-table-next';
import { LABEL_COMMON_LOADING } from 'src/@common/constants/label';
import { PlayerDTO } from 'src/@common/dto';
import { SuccessCodes } from 'src/@common/models/HttpStatusCode';
import { StatsPlayerMap, StatsPlayerResponse } from 'src/@common/models/stats.model';
import { fetchPlayerStats } from 'src/redux/services/stats.service';
import { MinusIcon, PlusIcon, ChartIcon } from '../core/icons';
import i18next from '../../i18n/i18n';
import Stats from '../Stats/table.component';

const expandManager = (
	stats: StatsPlayerMap,
	setStats: (value: React.SetStateAction<StatsPlayerMap>) => void,
	expandedRows: number[],
	setExpandedRows: (value: React.SetStateAction<number[]>) => void,
	isLoading: boolean,
	setIsLoading: (value: React.SetStateAction<boolean>) => void
): ExpandRowProps<PlayerDTO, number> => ({
	expandByColumnOnly: true,
	showExpandColumn: true,
	expanded: expandedRows,
	expandHeaderColumnRenderer: ({ isAnyExpands }) => (
		<>
			{isAnyExpands ? <MinusIcon size="sm" /> : <PlusIcon size="sm" />}
			<ChartIcon size="lg" />
		</>
	),
	expandColumnRenderer: ({ expanded }) => (
		<>
			{expanded ? <MinusIcon size="sm" /> : <PlusIcon size="sm" />}
			<ChartIcon size="lg" />
		</>
	),
	renderer: (row: PlayerDTO) => {
		// This scenario doesn't exists
		if (!row.id) {
			return <p>{i18next.t('stats:new_player')}</p>;
		}
		if (isLoading) {
			return <p>{i18next.t(LABEL_COMMON_LOADING)}</p>;
		}
		return stats[row.id] ? <Stats stats={stats[row.id]!} /> : <div>{i18next.t('stats:new_player')}</div>;
	},
	onExpand: (row: PlayerDTO, isExpand: boolean, rowIndex: number, e: SyntheticEvent) => {
		if (row.id) {
			if (isExpand) {
				// Cache results
				if (stats[row.id]) {
					setExpandedRows([...expandedRows, row.id]);
				} else {
					setIsLoading(true);
					fetchPlayerStats({ players: [row.id] }).then((result) => {
						if (row.id && SuccessCodes.includes(result.code)) {
							const { stats: statistics } = result as StatsPlayerResponse;
							stats[row.id] = statistics[row.id];
							setStats(stats);
						}
						setIsLoading(false);
						setExpandedRows([...expandedRows, row.id!]);
					});
				}
			} else {
				setExpandedRows((ex) => ex.filter((x) => x !== row.id));
			}
		}
	},
	onExpandAll: (isExpandAll: boolean, rows: Array<PlayerDTO>, e: SyntheticEvent) => {
		if (isExpandAll) {
			const ids = rows.filter((r) => !!r.id).map((r) => r.id!);
			setIsLoading(true);
			fetchPlayerStats({ players: ids }).then((result) => {
				if (SuccessCodes.includes(result.code)) {
					const { stats: statistics } = result as StatsPlayerResponse;
					setStats(statistics);
				}
				setIsLoading(false);
				setExpandedRows(ids);
			});
		} else {
			setExpandedRows([]);
		}
	},
});

export default expandManager;
