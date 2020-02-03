import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchPairs, valueFormatter } from './helper';

// Probabilmente il componente Select usa Ref.... Lascio cosi..
const PairsSelection = React.forwardRef((props, ref) => {
  const [pairsList, setPairsList] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const { row, columnIndex, id, onUpdate, onSelect, tournamentId } = props;

  function getValue() {
    return valueFormatter(selectedOption);
  }

  const handleChange = selectedOption => {
    selectedOption.pairId = id;
    setSelectedOption(selectedOption);
    valueFormatter(selectedOption);
    onUpdate(value);
    onSelect(selectedOption, row.id, columnIndex);
  };

  useEffect(() => fetchPairs(setPairsList, (tournamentId = 1)), []);

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
