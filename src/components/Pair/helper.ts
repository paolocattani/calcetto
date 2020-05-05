import { getEmptyPlayer } from 'services/player.service';
import { Styles } from 'react-select';
import { PairDTO } from 'models';

export const getEmptyRowModel = (label?: string): PairDTO => ({
  id: null,
  tId: 0,
  rowNumber: 0,
  player1: getEmptyPlayer(),
  player2: getEmptyPlayer(),
  alias: label || '',
  stage1Name: '',
  placement: 0,
  paid1: false,
  paid2: false,
});

export const fetchPairs = (setterFunction: React.Dispatch<React.SetStateAction<PairDTO[]>>, tId: number) => {
  (async () => {
    const response = await fetch(`/api/v1/pair/list/?tId=${tId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const result = await response.json();
    setterFunction(result);
  })();
};

export function valueFormatter(selectedOption: PairDTO) {
  console.log('valueFormatter : ', selectedOption);
  if (selectedOption.alias && selectedOption.alias !== '') return `${selectedOption.alias} ( ${selectedOption.id} )`;
  return createAlias(selectedOption);
}

export function createAlias(selectedOption: PairDTO) {
  console.log('createAlias : ', selectedOption);
  let value = `${selectedOption.rowNumber} : `;
  const { player1, player2, id } = selectedOption;
  value += player1!.alias ? player1!.alias : player1!.name;
  value += ' - ' + player2!.alias ? player2!.alias : player2!.name;
  value += ` ( ${id} )`;
  return value;
}

export const customStyles: Partial<Styles> | undefined = {
  // menuList: (provided, state) => ({ ...provided, border: '1px solid #ffc107' }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: 'white',
    color: 'black',
    '&:hover': {
      backgroundColor: '#64bd9c',
      color: 'white',
    },
  }),
  input: (provided) => ({ ...provided, backgroundColor: '#64bd9c' }),
  control: (provided) => ({ ...provided, height: '3vmin', marginBottom: 'auto' }),
  singleValue: (provided) => ({ ...provided }),
  valueContainer: (provided) => ({ ...provided, height: '100%', fontSize: 'larger' }),
};

export const fetchData = async (tId: number) => {
  // Fetch Pairs
  let response = await fetch(`/api/v1/pair/list/?tId=${tId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const rows = await response.json();

  response = await fetch(tId ? `/api/v1/player/list/${tId}` : '/api/v1/player/list', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const result = await response.json();
  const players = [...result, getEmptyPlayer('Nessun Giocatore')];

  console.log('rows : ', rows);
  return { rows, players };
};
