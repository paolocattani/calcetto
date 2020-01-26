import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchPlayers } from './helper';

// Probabilmente il componente Select usa Ref.... Lascio cosi..
const PlayerSelection = React.forwardRef((props, ref) => {
  const [playerList, setPlayerList] = useState([]);
  const [selectedOption, setSelectedOption] = useState();
  const { row, columnIndex, id, onUpdate, onSelect } = props;

  function getValue() {
    let value = '';
    if (selectedOption.alias) {
      value = selectedOption.alias;
    } else {
      value = selectedOption.surname ? `${selectedOption.name} - ${selectedOption.surname}` : selectedOption.name;
    }
    return value;
  }

  const handleChange = selectedOption => {
    selectedOption.pairId = id;
    setSelectedOption(selectedOption);
    let value = '';
    if (selectedOption.alias) {
      value = selectedOption.alias;
    } else {
      value = selectedOption.surname ? `${selectedOption.name} - ${selectedOption.surname}` : selectedOption.name;
    }

    onUpdate(value);
    onSelect(selectedOption, row.id, columnIndex);
  };

  useEffect(() => fetchPlayers(setPlayerList), []);

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
