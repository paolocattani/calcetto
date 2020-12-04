import { PairDTO } from 'src/@common/dto';
import React, { useState } from 'react';
import Select, { Styles, ValueType, ActionMeta, components } from 'react-select';
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
  onChange?: (value: ValueType<PairDTO, false>, rowIndex: number, actionMeta?: ActionMeta<PairDTO>) => void;
  components?: Partial<SelectComponents<PairDTO, false>>;
  defaultValue?: PairDTO;
}

// Probabilmente il componente Select usa Ref.... Lascio cosi..
// TODO: Si potrebbe generalizzare questo componente tramite i generics
const PairsSelect: React.FC<PairSelectProps> = React.forwardRef(
  ({ getOptionLabel, styles, rowIndex, options, onChange, defaultValue }, ref) => {
    const [selectedOption, setSelectedOption] = useState<PairDTO>();

    const handleChange = (value: ValueType<PairDTO, false>, actionMeta: ActionMeta<PairDTO>) => {
      setSelectedOption(value as PairDTO);
      if (onChange) onChange(value, rowIndex, actionMeta);
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
