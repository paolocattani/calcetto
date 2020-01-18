import React, { useEffect, useState } from 'react';
import Select, { ActionMeta, ValueType } from 'react-select';
import { playerType } from './type';
import { fetchPlayers } from './helper';

type propsType = {
  onSelect: (value: ValueType<playerType>) => void;
};

const PlayerSelection: React.FC<propsType> = (props: propsType) => {
  const [playerList, setPlayerList] = useState<playerType[]>([]);
  const [selectedOption, setSelectedOption] = useState<playerType | ValueType<playerType> | null>();

  const handleChange = (selectedOption: ValueType<playerType>, actionMeta: ActionMeta) => {
    setSelectedOption(selectedOption);
    props.onSelect(selectedOption);
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
};

export default PlayerSelection;
