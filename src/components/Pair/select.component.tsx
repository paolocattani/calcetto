import { PairDTO } from '../../@common/dto';
import React, { useState } from 'react';
import Select, { GroupTypeBase, StylesConfig, ValueType, ActionMeta, components, OptionsType } from 'react-select';
import { SelectComponents } from 'react-select/src/components';
import { getEmptyPair } from '../../@common/models';

interface PairSelectProps {
	tournamentId: number;
	// indice riga ( Stage2 )
	rowIndex: number;
	// stili
	styles?: StylesConfig<PairDTO, false, GroupTypeBase<PairDTO>>;
	// opzioni della lista
	options: PairDTO[];
	// Callback per formattare le opzioni della lista
	getOptionLabel?: (option: PairDTO) => string;
	// Callback onChange
	onChange?: (value: ValueType<PairDTO, false>, rowIndex: number, actionMeta?: ActionMeta<PairDTO>) => void;
	components?: SelectComponents<PairDTO, false, GroupTypeBase<PairDTO>>;
	defaultValue?: PairDTO;
}

// Probabilmente il componente Select usa Ref.... Lascio cosi..
// TODO: Si potrebbe generalizzare questo componente tramite i generics
const PairsSelect: React.FC<PairSelectProps> = React.forwardRef(
	({ getOptionLabel, styles, rowIndex, options, onChange, defaultValue, tournamentId }, ref) => {
		const [selectedOption, setSelectedOption] = useState<PairDTO>();

		const handleChange = (value: PairDTO | OptionsType<PairDTO> | null, actionMeta: ActionMeta<PairDTO>) => {
			const newValue = value ? (value as PairDTO) : getEmptyPair('-', tournamentId);
			setSelectedOption(newValue);
			if (onChange) {
				onChange(newValue, rowIndex, actionMeta);
			}
		};

		return (
			<Select
				defaultValue={defaultValue}
				components={components}
				styles={styles}
				options={options}
				onChange={handleChange}
				getOptionLabel={getOptionLabel}
				value={selectedOption}
				placeholder="Cerca..."
				isSearchable
				isClearable
			/>
		);
	}
);

export default PairsSelect;
