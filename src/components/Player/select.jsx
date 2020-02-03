import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchPlayers, valueFormatter } from './helper';

// Probabilmente il componente Select usa Ref.... Lascio cosi..
const PlayerSelection = React.forwardRef((props, ref) => {
  const [playerList, setPlayerList] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const { row, columnIndex, id, onUpdate, onSelect } = props;

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

  useEffect(() => fetchPlayers(setPlayerList), []);

  console.log('render : ', playerList);
  return (
    <Select
      options={playerList}
      onChange={handleChange}
      value={selectedOption}
      placeholder="Cerca..."
      isSearchable
      isClearable
    />
  );
});

export default PlayerSelection;
