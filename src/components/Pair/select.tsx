import React, { useState } from 'react';
import Select, { Styles, ValueType, ActionMeta } from 'react-select';
import { PairDTO } from 'models';

interface PairSelectProps {
  // indice riga ( Stage2 )
  rowIndex: number;
  // stili
  styles?: Partial<Styles>;
  // opzioni della lista
  options: PairDTO[];
  // Callback per formattare le opzioni della lista
  getOptionLabel?: (option: PairDTO) => string;
  // Callback onChange
  onChange?: (value: ValueType<PairDTO>, rowIndex: number, actionMeta?: ActionMeta) => void;
}

// Probabilmente il componente Select usa Ref.... Lascio cosi..
// TODO: Si potrebbe generalizzare questo componente tramite i generics
const PairsSelect: React.FC<PairSelectProps> = React.forwardRef(
  ({ getOptionLabel, styles, rowIndex, options, onChange }, ref) => {
    const [selectedOption, setSelectedOption] = useState<PairDTO>();

    const handleChange = (value: ValueType<PairDTO>, actionMeta: ActionMeta) => {
      setSelectedOption(value as PairDTO);
      if (onChange) onChange(value, rowIndex, actionMeta);
    };

    return (
      <Select
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
