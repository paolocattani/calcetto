import React, { useEffect, useState } from 'react';
import Select, { ActionMeta, ValueType } from 'react-select';
import { playerType } from './type';
import { fetchPlayers } from './helper';

// Probabilmente il componente Select usa Ref.... Lascio cosi..
const PlayerSelection = React.forwardRef((props, ref) => {
  const [playerList, setPlayerList] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (selectedOption, actionMeta) => {
    setSelectedOption(selectedOption);
    props.onSelect(selectedOption);
    if (props.onUpdate) props.onUpdate(selectedOption.alias || selectedOption.name);
  };

  useEffect(() => fetchPlayers(setPlayerList), []);

  console.log('select ', props);
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
