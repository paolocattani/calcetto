import { PairDTO } from '../../@common/dto';
import React, { useState } from 'react';
import Select, { Styles, ValueType, ActionMeta, components } from 'react-select';
import { SelectComponents } from 'react-select/src/components';
import { getEmptyPair } from '../../@common/models';

interface PairSelectProps {
  tournamentId:number;
  // indice riga ( Stage2 )
  rowIndex: number;
  // stili
  styles?: Partial<Styles>;
  // opzioni della lista
  options: PairDTO[];
  // Callback per formattare le opzioni della lista
  getOptionLabel?: (option: PairDTO) => string;
  // Callback onChange
  onChange?: (value: ValueType<PairDTO, false>, rowIndex: number, actionMeta?: ActionMeta<PairDTO>) => void;
  components?: Partial<SelectComponents<PairDTO, false>>;
  defaultValue?: PairDTO;
}

// Probabilmente il componente Select usa Ref.... Lascio cosi..
// TODO: Si potrebbe generalizzare questo componente tramite i generics
const PairsSelect: React.FC<PairSelectProps> = React.forwardRef(
  ({ getOptionLabel, styles, rowIndex, options, onChange, defaultValue,tournamentId }, ref) => {
    const [selectedOption, setSelectedOption] = useState<PairDTO>();

    const handleChange = (value: ValueType<PairDTO, false>, actionMeta: ActionMeta<PairDTO>) => {
      const newValue = value ? value : getEmptyPair('-', tournamentId);
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
