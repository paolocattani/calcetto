import React, { useState } from 'react';
import Select, { Styles, ValueType, ActionMeta } from 'react-select';
import { valueFormatter } from './helper';
// FIXME: import makeAnimated from 'react-select/animated';
import { PlayerDTO } from 'redux/models';

export interface PlayerSelectProps {
  styles?: Partial<Styles>;
  options: PlayerDTO[];
  columnIndex: number;
  id: number;
  onUpdate: any;
  onSelect: any;
  row: any;
}

const PlayerSelection: React.FC<PlayerSelectProps> = React.forwardRef(
  ({ styles, row, columnIndex, /*id,*/ onUpdate, onSelect, options }, ref) => {
    const [selectedOption, setSelectedOption] = useState<PlayerDTO>();

    const handleChange = (selectedOption: ValueType<PlayerDTO>, actionMeta: ActionMeta<PlayerDTO>) => {
      // selectedOption.pairId = id;
      setSelectedOption(selectedOption as PlayerDTO);
      const value = valueFormatter(selectedOption);
      onUpdate(value);
      onSelect(selectedOption, row.id, columnIndex);
    };

    return (
      <Select
        styles={styles}
        options={options}
        onChange={handleChange}
        value={selectedOption}
        placeholder="Cerca..."
        isSearchable
        isClearable
      />
    );
  }
);

export default PlayerSelection;
