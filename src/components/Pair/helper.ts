import { StylesConfig } from 'react-select';
import { PairDTO, PlayerDTO } from '../../@common/dto';

export const valueFormatter = (selectedOption: PairDTO): string =>
	selectedOption.alias ? `${selectedOption.alias}` : createAlias(selectedOption);

export function createAlias(selectedOption: PairDTO): string {
	let value = `${selectedOption.rowNumber} : `;
	const { player1, player2 } = selectedOption;
	value += player1!.alias ? player1!.alias : player1!.name;
	value += ' - ' + player2!.alias ? player2!.alias : player2!.name;
	// value += ` ( ${id} )`;
	return value;
}

export const customStyles: Partial<StylesConfig<PlayerDTO, false>> | undefined = {
	// menuList: (provided, state) => ({ ...provided, border: '1px solid #ffc107' }),
	option: (provided /*, state*/) => ({
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
