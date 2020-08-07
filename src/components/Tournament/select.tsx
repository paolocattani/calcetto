import React, { useState, useEffect } from 'react';
// React-Select
import Select, { Styles, ValueType } from 'react-select';
// Bootstrap
import { Form, Button, Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router';
// Core
import { RightArrowIcon } from '../core/iconsx';
// Helper
import { cardStyle, IndicatorSeparator } from './helper';
import { formatDate, translateTournamentProgress } from '../core/utils';
import NewTournament from './new';

import { useDispatch, useSelector } from 'react-redux';
import { TournamentSelector } from 'redux/selectors/tournament.selector';
import { TournamentAction, PairAction } from 'redux/actions';
import { withRouter } from 'react-router-dom';
import { TournamentDTO } from 'redux/models/tournament.model';
import { SessionSelector } from 'redux/selectors/session.selector';
import { toast } from 'react-toastify';

const FTournament = () => {
  // Redux
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  const session = useSelector(SessionSelector.getSession);

  // Tournament list from Db
  const tournamentsList = useSelector(TournamentSelector.getTournamentsList);
  const tournament = useSelector(TournamentSelector.getTournament);

  // State definition
  const [newTournament, setNewTournament] = useState(false);

  useEffect(() => {
    if (!tournamentsList || tournamentsList.length === 0) {
      console.log('useEffect: ', tournamentsList);
      dispatch(TournamentAction.fetchTournaments.request({}));
    }
  }, [dispatch, tournamentsList]);

  const handleSubmit = async (event: React.FormEvent<HTMLElement>): Promise<void> => {
    event.preventDefault();
    if (tournament) {
      if (session.isAdmin) {
        currentHistory.push('/tournament');
      } else {
        dispatch(PairAction.fetchPairs.request({ tId: tournament.id! }));
        currentHistory.push('/stage1');
      }
    } else toast.error('Errore, riprovare piu tardi...');
  };

  const onNewTournament = (value: React.SetStateAction<boolean>) => {
    dispatch(TournamentAction.setTournament(null));
    setNewTournament(value);
  };

  // console.log('render tournament :', tournament, tournamentsList);

  return (
    <>
      <Col md={{ span: '6', offset: '3' }} sm="12">
        <Card style={cardStyle}>
          <Card.Header as="h2">Torneo</Card.Header>
          <Card.Body>
            <Col>
              {session.isAdmin && newTournament ? (
                <NewTournament />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <label htmlFor="tournamentSelect">Selezione Torneo</label>
                  <Select
                    id="tournamentSelect"
                    components={{ IndicatorSeparator }}
                    styles={customStyles}
                    value={tournament}
                    options={tournamentsList}
                    placeholder="Cerca un torneo"
                    isSearchable
                    getOptionLabel={getOptionLabel}
                    isClearable
                    onChange={(tournament: ValueType<TournamentDTO>) =>
                      dispatch(TournamentAction.setTournament(tournament as TournamentDTO))
                    }
                  />
                  <Button
                    type="submit"
                    size="lg"
                    variant="outline-warning"
                    className="float-right default-color-white"
                    disabled={!tournament}
                  >
                    <span style={{ fontSize: 'larger', fontWeight: 'bolder', padding: '1vw' }}>Prosegui</span>
                    <RightArrowIcon size="lg" />
                  </Button>
                </Form>
              )}
            </Col>
          </Card.Body>
          <Card.Footer>
            {session.isAdmin ? (
              newTournament ? (
                <Button
                  type="button"
                  size="lg"
                  variant="outline-warning"
                  className="float-left default-color-white"
                  onClick={() => onNewTournament(false)}
                >
                  Seleziona un torneo
                </Button>
              ) : (
                <Button
                  type="button"
                  size="lg"
                  variant="outline-warning"
                  className="float-left default-color-white"
                  onClick={() => onNewTournament(true)}
                >
                  Crea un nuovo torneo
                </Button>
              )
            ) : null}
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default withRouter(FTournament);

const getOptionLabel = ({ name, date, progress }: TournamentDTO) =>
  name + ' - ' + formatDate(date) + '@' + translateTournamentProgress(progress);

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
