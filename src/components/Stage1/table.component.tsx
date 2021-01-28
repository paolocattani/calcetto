import React, { useState, useEffect } from 'react';
// table
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
// helper
import TableHeader from './header.component';
import { columns } from './editor';
//
import { useSelector } from '../core/types';
import { useDispatch } from 'react-redux';
import { AuthSelector } from '../../redux/selectors/auth.selector';
// style
import { Stage1Action } from '../../redux/actions';
import { TournamentSelector, Stage1Selector } from '../../redux/selectors';
import { PairDTO, Stage1Row, TournamentProgress } from '../../@common/dto';
import { fetchStage1 } from '../../redux/services/stage1.service';
import { SuccessCodes } from '../../@common/models/HttpStatusCode';
import { FetchStage1Response, UpdatePlacementRequest } from '../../@common/models';
import { comparator } from './helper';
import { cellEditProps } from './editor';

interface Stage1TableProps {
	pairsList: Array<PairDTO>;
	stageName: string;
	autoOrder: boolean;
}
// TODO: convert this component to ts
// eslint-disable-next-line sonarjs/cognitive-complexity
const Stage1Table: React.FC<Stage1TableProps> = ({ pairsList, autoOrder, stageName }) => {
	const dispatch = useDispatch();
	// Sono presenti aggiornamenti
	const toogleRefresh = useSelector(Stage1Selector.getToogleRefresh);
	// From store
	const isAdmin = useSelector(AuthSelector.isAdmin);
	const tournament = useSelector(TournamentSelector.getTournament)!;
	const selectedRows = useSelector((state) => Stage1Selector.getSelectedRows(stageName, state));
	// State
	const [isLoading, setIsLoading] = useState(false);
	const [saved, setIsSaved] = useState(false);
	const [rows, setRows] = useState<Array<Stage1Row>>([]);

	// Effects
	useEffect(
		() => {
			(async () => {
				setIsLoading(true);
				const response = await fetchStage1({ pairsList, stageName });
				if (SuccessCodes.includes(response.code)) {
					const result = response as FetchStage1Response;
					if (!!autoOrder)
						[...result.rows]
							.sort((e1, e2) => comparator(e1, e2))
							.forEach((row, index) => (result.rows[row.rowNumber - 1]['placement'] = index + 1));
					setRows(result.rows);
				}
				setIsLoading(false);
			})();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[pairsList, toogleRefresh]
	);

	const selectRow: SelectRowProps<Stage1Row> = {
		mode: 'checkbox',
		selected: selectedRows.map((r) => r.id),
		onSelect: (row, isSelected) => {
			const found = selectedRows.find((e) => e.rowNumber === row.rowNumber) ? true : false;
			let selected: Array<Stage1Row>;
			if (isSelected) {
				selected = found ? selectedRows : [...selectedRows, row];
			} else {
				selected = found ? selectedRows.filter((e) => e.rowNumber !== row.rowNumber) : selectedRows;
			}
			dispatch(Stage1Action.updateSelectedPairs.request({ stage1Name: stageName, stage1Rows: selected }));
			return true;
		},
		onSelectAll: (isSelected, s1Rows) => {
			// console.log( 'handleOnSelectAll : ', isSelected, s1Rows );
			dispatch(
				Stage1Action.updateSelectedPairs.request({ stage1Name: stageName, stage1Rows: isSelected ? s1Rows : [] })
			);
		},
		style: { backgroundColor: '#c8e6c9' },
		hideSelectColumn: !isAdmin || tournament.progress >= TournamentProgress.Stage2,
	};

	console.log('Refreshing : ', toogleRefresh);
	return isLoading ? (
		<h3>
			Caricamento girone <b>{stageName}</b> in corso....
		</h3>
	) : (
		<BootstrapTable
			key={`Stege1-${stageName}`}
			bootstrap4
			keyField="id"
			data={rows}
			columns={columns(pairsList) as ColumnDescription<Stage1Row, Stage1Row>[]}
			selectRow={selectRow}
			cellEdit={cellEditProps(
				isAdmin && tournament.progress < TournamentProgress.Stage2,
				stageName,
				autoOrder,
				rows,
				setRows,
				(request: UpdatePlacementRequest) => dispatch(Stage1Action.updatePlacement.request(request)),
				setIsSaved
			)}
			noDataIndication="Nessun dato reperito"
			headerClasses="default-background default-color-yellow"
			caption={<TableHeader title={stageName} saved={saved} />}
			striped
			hover
		/>
	);
};

export default Stage1Table;
