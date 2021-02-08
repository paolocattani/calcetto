import React, { useState } from 'react';
// Bootstrap
import { Button, Card, Col, Row } from 'react-bootstrap';
// Helper
import { cardStyle } from './helper';
import NewTournament from './new.component';
import SelectTournament from './select.component';

import { useSelector } from '../core/types';
import { useDispatch } from 'react-redux';
import { TournamentSelector } from '../../redux/selectors/tournament.selector';
import { TournamentAction } from '../../redux/actions';
import { AuthSelector } from '../../redux/selectors/auth.selector';
import { useTranslation } from 'react-i18next';
import { LABEL_TOURNAMENT_SELECT } from '../../@common/constants/label';
import TheBests from './bests.pairs.component';

const FTournament: React.FC = () => {
	// Redux
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'tournament']);
	const isAdmin = useSelector(AuthSelector.isAdmin);
	// Tournament list from Db
	const tournamentsList = useSelector(TournamentSelector.getTournamentsList);

	// State definition
	const [newTournament, setNewTournament] = useState(false);

	const onNewTournament = (value: React.SetStateAction<boolean>) => {
		dispatch(TournamentAction.setTournament(null));
		setNewTournament(value);
	};

	const cardBody = () => {
		// Nessun torneo presente
		if ((!tournamentsList || tournamentsList.length === 0) && !isAdmin) {
			return (
				<p className="text-white text-justify font-italic lead">
					<strong> {t('tournament:error.none')}</strong>
				</p>
			);
		}
		return isAdmin && newTournament ? <NewTournament /> : <SelectTournament />;
	};

	return (
		<>
			<Row>
				<Col md={{ span: '6', offset: '3' }} sm="12">
					<Card style={cardStyle} data-cy="tournament-form">
						<Card.Header as="h2">{t('tournament:tournament')}</Card.Header>
						<Card.Body>
							<Col>{cardBody()}</Col>
						</Card.Body>
						<Card.Footer>
							{isAdmin ? (
								<Button
									type="button"
									data-cy={newTournament ? 'select-tournament' : 'new-tournament'}
									size="lg"
									variant="outline-warning"
									className="float-left default-color-white"
									onClick={() => onNewTournament(!newTournament)}
								>
									{t(newTournament ? LABEL_TOURNAMENT_SELECT : 'tournament:new')}
								</Button>
							) : null}
						</Card.Footer>
					</Card>
				</Col>
			</Row>
			<Row className="mt-2">
				<Col>
					<TheBests />
				</Col>
			</Row>
		</>
	);
};

export default FTournament;
