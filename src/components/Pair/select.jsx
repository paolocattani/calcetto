import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchPairs, valueFormatter } from './helper';

// Probabilmente il componente Select usa Ref.... Lascio cosi..
const PairsSelection = React.forwardRef((props, ref) => {
  const [pairsList, setPairsList] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const { row, columnIndex, id, onUpdate, onSelect, tId } = props;

  function getValue() {
    console.log('getValue : ', selectedOption);
    return valueFormatter(selectedOption);
  }

  const handleChange = selectedOption => {
    selectedOption.pairId = id;
    setSelectedOption(selectedOption);
    const value = valueFormatter(selectedOption);
    console.log('handleSelect : ', value);
    onUpdate(value);
    onSelect(selectedOption, row.id, columnIndex);
  };

  useEffect(() => fetchPairs(setPairsList, tId), [tId]);

  console.log('render : ', pairsList);
  return (
    <Select
      options={pairsList}
      onChange={handleChange}
      value={selectedOption}
      placeholder="Cerca..."
      isSearchable
      isClearable
    />
  );
});

export default PairsSelection;
