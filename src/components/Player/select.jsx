import React, { useEffect, useState } from 'react';
import Select, { ActionMeta, ValueType } from 'react-select';
import { playerType } from './type';
import { fetchPlayers } from './helper';

// Probabilmente il componente Select usa Ref.... Lascio cosi..
const PlayerSelection = React.forwardRef((props, ref) => {
  const [playerList, setPlayerList] = useState([]);
  const [selectedOption, setSelectedOption] = useState();

  const { row, column, rowIndex, columnIndex } = props;
  const handleChange = (selectedOption, actionMeta) => {
    setSelectedOption(selectedOption);
    selectedOption.pairId = props.id;
    props.onSelect(selectedOption, row, column);
    props.onUpdate(selectedOption.alias || selectedOption.name);
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
