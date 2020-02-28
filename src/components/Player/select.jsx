import React, { useState } from 'react';
import Select from 'react-select';
import { valueFormatter } from './helper';

// Probabilmente il componente Select usa Ref.... Lascio cosi..
const PlayerSelection = React.forwardRef((props, ref) => {
  const [selectedOption, setSelectedOption] = useState();
  const { row, columnIndex, id, onUpdate, onSelect, options } = props;

  // eslint-disable-next-line no-unused-vars
  function getValue() {
    return valueFormatter(selectedOption);
  }

  const handleChange = selectedOption => {
    selectedOption.pairId = id;
    setSelectedOption(selectedOption);
    const value = valueFormatter(selectedOption);
    onUpdate(value);
    onSelect(selectedOption, row.id, columnIndex);
  };

  return (
    <Select
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
