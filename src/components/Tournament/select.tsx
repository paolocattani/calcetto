import React, { useState, useEffect } from 'react';
// React-Select
import Select, { Styles } from 'react-select';
// Bootstrap
import { Form, Button, Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
// Core
import { RightArrowIcon } from '../core/icons';
// Helper
import { cardStyle, IndicatorSeparator } from './helper';
import { formatDate } from '../../@common/utils/date.utils';
import NewTournament from './new';

import { useDispatch, useSelector } from 'react-redux';
import { TournamentSelector } from '../../redux/selectors/tournament.selector';
import { TournamentAction, PairAction } from '../../redux/actions';
import { AuthSelector } from '../../redux/selectors/auth.selector';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { TournamentDTO } from '../../@common/dto';
import { LABEL_TOURNAMENT_SELECT } from '../../@common/constants/label';

const FTournament = () => {
  // Redux
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  const { t } = useTranslation(['common', 'tournament']);

  const isAdmin = useSelector(AuthSelector.isAdmin);

  // Tournament list from Db
  const tournamentsList = useSelector(TournamentSelector.getTournamentsList);
  const tournament = useSelector(TournamentSelector.getTournament);

  // State definition
  const [newTournament, setNewTournament] = useState(false);
  useEffect(() => {
    if (!tournamentsList || tournamentsList.length === 0) {
      dispatch(TournamentAction.fetch.request({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();
    if (tournament) {
      if (isAdmin) {
        currentHistory.push('/tournament');
      } else {
        dispatch(PairAction.fetch.request({ tId: tournament.id! }));
        currentHistory.push('/stage1');
      }
    } else toast.error(t('common:error.generic'));
  };

  const onNewTournament = (value: React.SetStateAction<boolean>) => {
    dispatch(TournamentAction.setTournament(null));
    setNewTournament(value);
  };

  // console.log('render tournament :', tournament, tournamentsList);

  const cardBody = () => {
    // Nessun torneo presente
    if ((!tournamentsList || tournamentsList.length === 0) && !isAdmin) {
      return (
        <p className="text-white text-justify font-italic lead">
          <strong> {t('tournament:error.none')}</strong>
        </p>
      );
    }
    if (isAdmin && newTournament) {
      return <NewTournament />;
    } else {
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
    }
  };

  const cardFooter = () =>
    isAdmin ? (
      newTournament ? (
        <Button
          type="button"
          size="lg"
          variant="outline-warning"
          className="float-left default-color-white"
          onClick={() => onNewTournament(false)}
        >
          {t(LABEL_TOURNAMENT_SELECT)}
        </Button>
      ) : (
        <Button
          type="button"
          size="lg"
          variant="outline-warning"
          className="float-left default-color-white"
          onClick={() => onNewTournament(true)}
        >
          {t('tournament:new')}
        </Button>
      )
    ) : null;

  return (
    <>
      <Col md={{ span: '6', offset: '3' }} sm="12">
        <Card style={cardStyle} data-cy="tournament-form">
          <Card.Header as="h2">{t('tournament:tournament')}</Card.Header>
          <Card.Body>
            <Col>{cardBody()}</Col>
          </Card.Body>
          <Card.Footer>{cardFooter()}</Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default FTournament;

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
