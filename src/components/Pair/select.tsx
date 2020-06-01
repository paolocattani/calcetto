import React, { useState } from 'react';
import Select, { Styles, ValueType, ActionMeta, components } from 'react-select';
import { PairDTO } from 'models';
import { SelectComponents } from 'react-select/src/components';

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
  components?: Partial<SelectComponents<PairDTO>>;
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
