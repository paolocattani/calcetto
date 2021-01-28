import React from 'react';
import { SyntheticEvent } from 'react';
import { ExpandRowProps } from 'react-bootstrap-table-next';
import { LABEL_COMMON_LOADING } from 'src/@common/constants/label';
import { PairDTO } from 'src/@common/dto';
import { SuccessCodes } from 'src/@common/models/HttpStatusCode';
import { StatsPairMap, StatsPairResponse } from 'src/@common/models/stats.model';
import { fetchPairStats } from 'src/redux/services/stats.service';
import { MinusIcon, PlusIcon, ChartIcon } from '../core/icons';
import Stats from '../Stats/table.component';
import i18next from '../../i18n/i18n';

const expandManager = (
	stats: StatsPairMap,
	setStats: (value: React.SetStateAction<StatsPairMap>) => void,
	expandedRows: number[],
	setExpandedRows: (value: React.SetStateAction<number[]>) => void,
	isLoading: { state: boolean; message: string },
	setIsLoading: (value: React.SetStateAction<{ state: boolean; message: string }>) => void
): ExpandRowProps<PairDTO, number> => ({
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
	renderer: (row: PairDTO) => {
		if (!row.id) {
			return <p>{i18next.t('stats:partial_pair')}</p>;
		}
		if (isLoading.state) {
			return <p>{i18next.t(LABEL_COMMON_LOADING)}</p>;
		}
		return stats[row.id] ? <Stats stats={stats[row.id]!} /> : <div>{i18next.t('stats:not_found')}</div>;
	},
	onExpand: (row: PairDTO, isExpand: boolean, rowIndex: number, e: SyntheticEvent) => {
		if (row.id) {
			if (isExpand) {
				// Cache results
				if (stats[row.id]) {
					setExpandedRows([...expandedRows, row.id]);
				} else {
					setIsLoading({ state: true, message: i18next.t(LABEL_COMMON_LOADING) });
					fetchPairStats({ pairs: [row.id] }).then((result) => {
						if (row.id && SuccessCodes.includes(result.code)) {
							const { stats: statistics } = result as StatsPairResponse;
							console.log('result :', statistics, result);
							stats[row.id] = statistics[row.id];
							setStats(stats);
						}
						setIsLoading({ state: false, message: '' });
						setExpandedRows([...expandedRows, row.id!]);
					});
				}
			} else {
				setExpandedRows((ex) => ex.filter((x) => x !== row.id));
			}
		}
	},
	onExpandAll: (isExpandAll: boolean, rows: Array<PairDTO>, e: SyntheticEvent) => {
		if (isExpandAll) {
			const ids = rows.filter((r) => !!r.id).map((r) => r.id!);
			setIsLoading({ state: true, message: i18next.t(LABEL_COMMON_LOADING) });
			fetchPairStats({ pairs: ids }).then((result) => {
				if (SuccessCodes.includes(result.code)) {
					const { stats: statistics } = result as StatsPairResponse;
					setStats(statistics);
				}
				setIsLoading({ state: false, message: '' });
				setExpandedRows(ids);
			});
		} else {
			setExpandedRows([]);
		}
	},
});

export default expandManager;
