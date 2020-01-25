import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { fetchPlayers } from './helper';

// Probabilmente il componente Select usa Ref.... Lascio cosi..
const PlayerSelection = React.forwardRef((props, ref) => {
  const [playerList, setPlayerList] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  const { row, column, rowIndex, columnIndex } = props;

  const handleChange = (selectedOption, actionMeta) => {
    selectedOption.pairId = props.id;
    setSelectedOption(selectedOption);
    console.log('Player select : ', selectedOption);
    props.onUpdate(selectedOption.alias ? selectedOption.alias : selectedOption.name);
    props.onSelect(selectedOption, rowIndex, columnIndex);
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
