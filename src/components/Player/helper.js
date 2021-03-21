/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { Button } from 'react-bootstrap';
import filterTableFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Type } from 'react-bootstrap-table2-editor';
import { PlayerRole } from '../../@common/dto';
import { EditIcon } from '../core/icons';
// Filter
let nameFilter;
let surnameFilter;
let aliasFilter;
let roleFilter;
let emailFilter;
let phoneFilter;

export function clearAllFilter(isAdmin) {
	nameFilter('');
	surnameFilter('');
	aliasFilter('');
	roleFilter('');
	if (isAdmin) {
		emailFilter('');
		phoneFilter('');
	}
}

export const filterFactory = filterTableFactory();

// Columns default
const playerColumns = (isAdmin, labels, addEdit) => [
	{ dataField: 'rowNumber', text: 'ID', editable: false, headerStyle: (/* column, colIndex */) => ({ width: '3%' }) },
	{
		dataField: 'name',
		text: labels.name,
		autoSelectText: true,
		headerStyle: (/* column, colIndex */) => ({ width: isAdmin ? '16%' : '25%' }),
		filter: textFilter({
			placeholder: `${labels.filter}...`,
			getFilter: (filter) => (nameFilter = filter),
		}),
	},
	{
		dataField: 'surname',
		text: labels.surname,
		autoSelectText: true,
		headerStyle: (/* column, colIndex */) => ({ width: isAdmin ? '16%' : '25%' }),
		filter: textFilter({
			placeholder: `${labels.filter}...`,
			getFilter: (filter) => (surnameFilter = filter),
		}),
	},
	{
		dataField: 'alias',
		text: labels.alias,
		headerStyle: (/* column, colIndex */) => ({ width: isAdmin ? '17%' : '25%' }),
		autoSelectText: true,
		filter: textFilter({
			placeholder: `${labels.filter}...`,
			getFilter: (filter) => (aliasFilter = filter),
		}),
	},
	{
		dataField: 'role',
		text: labels.role,
		headerStyle: (/* column, colIndex */) => ({ width: `${isAdmin ? '11' : '15'}%` }),
		filter: selectFilter({
			placeholder: `${labels.filter}...`,
			options: {
				[PlayerRole.GoalKeeper]: labels.goalKeeper,
				[PlayerRole.Striker]: labels.striker,
				[PlayerRole.Master]: labels.master,
			},
			getFilter: (filter) => (roleFilter = filter),
		}),
		editor: {
			type: Type.SELECT,
			getOptions: () => {
				return [
					{ value: PlayerRole.GoalKeeper, label: labels.goalKeeper },
					{ value: PlayerRole.Striker, label: labels.striker },
					{ value: PlayerRole.Master, label: labels.master },
				];
			},
		},
	},
	{
		dataField: 'email',
		text: labels.email,
		headerStyle: (/* column, colIndex */) => ({ width: '20%' }),
		autoSelectText: true,
		hidden: !isAdmin,
		filter: textFilter({
			placeholder: `${labels.filter}...`,
			getFilter: (filter) => (emailFilter = filter),
		}),
	},
	{
		dataField: 'phone',
		headerStyle: (/* column, colIndex */) => ({ width: '10%' }),
		text: labels.phone,
		autoSelectText: true,
		hidden: !isAdmin,
		filter: textFilter({
			placeholder: `${labels.filter}...`,
			getFilter: (filter) => (phoneFilter = filter),
		}),
	},
	// https://github.com/react-bootstrap-table/react-bootstrap-table2/blob/master/docs/columns.md#isDummyField
	{
		dataField: 'actions',
		isDummyField: true,
		text: 'Azioni',
		hidden: !isAdmin,
		formatter: (cell, row) => (
			<Button variant="success" onClick={() => addEdit(row)}>
				<EditIcon />
			</Button>
		),
	},
	{ dataField: 'match_played', text: 'Partite Giocate', hidden: true },
	{ dataField: 'match_won', text: 'Vittorie', hidden: true },
	{ dataField: 'total_score', text: 'Punteggio', hidden: true },
];

export default playerColumns;

export function valueFormatter(selectedOption) {
	let value = '';
	if (!selectedOption) return '';
	if (selectedOption.alias) {
		value = selectedOption.alias;
	} else {
		value = selectedOption.surname ? `${selectedOption.name} - ${selectedOption.surname}` : selectedOption.name;
	}
	return value;
}
