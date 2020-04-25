import React, { useState } from 'react';
import Select, { Styles, ValueType, ActionMeta } from 'react-select';
import { valueFormatter } from './helper';
// FIXME: import makeAnimated from 'react-select/animated';
import { PlayerDTO } from 'models';

export interface IPlayerSelect {
  styles?: Partial<Styles>;
  options: PlayerDTO[];
  columnIndex: number;
  id: number;
  onUpdate: any;
  onSelect: any;
  row: any;
}

const PlayerSelection: React.FC<IPlayerSelect> = React.forwardRef((props, ref) => {
  const [selectedOption, setSelectedOption] = useState<PlayerDTO>();
  const { styles, row, columnIndex, id, onUpdate, onSelect, options } = props;

  const handleChange = (selectedOption: ValueType<PlayerDTO>, actionMeta: ActionMeta) => {
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
});

export default PlayerSelection;
