import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Select, { Styles } from 'react-select';
import { toast } from 'react-toastify';
import { LABEL_TOURNAMENT_SELECT } from '../../@common/constants/label';
import { TournamentDTO } from '../../@common/dto';
import { formatDate } from '../../@common/utils';
import { PairAction, Stage1Action, Stage2Action, TournamentAction } from 'src/redux/actions';
import { AuthSelector, TournamentSelector } from '../../redux/selectors';
import { tournamentsList } from '../../test/commons';
import { RightArrowIcon } from '../core/icons';
import { IndicatorSeparator } from './helper';
import { useTranslation } from 'react-i18next';

interface SelectTournamentProps {}

const SelectTournament: React.FC<SelectTournamentProps> = () => {
	const dispatch = useDispatch();
	const currentHistory = useHistory();
	const { t } = useTranslation(['common', 'tournament']);

	const isAdmin = useSelector(AuthSelector.isAdmin);
	const tournament = useSelector(TournamentSelector.getTournament);

	const handleSubmit = async (event: React.FormEvent<HTMLElement>): Promise<void> => {
		event.preventDefault();
		if (tournament) {
			if (isAdmin) {
				// Reset all
				dispatch(PairAction.reset({}));
				dispatch(Stage1Action.reset({}));
				dispatch(Stage2Action.reset({}));
				dispatch(PairAction.reset({}));
				currentHistory.push('/tournament');
			} else {
				console.log('Fetching pairs for tournament : ', tournament.id);
				dispatch(PairAction.fetch.request({ tId: tournament.id, history: currentHistory }));
			}
		} else toast.error(t('common:error.generic'));
	};

	return (
		<Form onSubmit={handleSubmit}>
			<label htmlFor="tournamentSelect">{t(LABEL_TOURNAMENT_SELECT)}</label>
			<Select
				id="tournamentSelect"
				aria-label={t(LABEL_TOURNAMENT_SELECT)}
				components={{ IndicatorSeparator }}
				styles={customStyles}
				value={tournament}
				options={tournamentsList}
				placeholder={t('tournament:search')}
				isSearchable
				getOptionLabel={({ name, date, progress }) =>
					`${name} - ${formatDate(date)} @ ${t(`tournament:progress.${progress}`)}`
				}
				isClearable
				onChange={(selected) => dispatch(TournamentAction.setTournament(selected as TournamentDTO))}
			/>
			<Button
				data-cy="select-submit"
				type="submit"
				size="lg"
				variant="outline-warning"
				className="float-right default-color-white"
				disabled={!tournament}
			>
				<span style={{ fontSize: 'larger', fontWeight: 'bolder', padding: '1vw' }}>{t('continue')}</span>
				<RightArrowIcon size="lg" />
			</Button>
		</Form>
	);
};

const customStyles: Partial<Styles> | undefined = {
	// menuList: (provided, state) => ({ ...provided, border: '1px solid #ffc107' }),
	option: (provided) => ({
		...provided,
		backgroundColor: 'white',
		color: 'black',
		'&:hover': {
			backgroundColor: '#64bd9c',
			color: 'white',
		},
	}),
	control: (provided) => ({ ...provided, height: '3vmin', marginBottom: '40px' }),
	singleValue: (provided) => ({ ...provided }),

	valueContainer: (provided) => ({
		...provided,
		height: '100%',
		fontSize: 'larger',
		alignItems: 'center',
		justifyContent: 'flex-start',
		'&:active': {
			height: '100%',
			fontSize: 'larger',
			justifyContent: 'flex-start',
			alignItems: 'center',
		},
	}),
};

export default SelectTournament;
