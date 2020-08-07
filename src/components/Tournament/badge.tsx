import React from 'react';
import { TournamentSelector } from 'redux/selectors';
import { useSelector } from 'react-redux';
import { Row, Col, Badge } from 'react-bootstrap';
import { formatDate, translateTournamentProgress } from 'components/core/utils';

interface TournamentBadgeProps {}
const TournamentBadge: React.FC<TournamentBadgeProps> = () => {
  const tournament = useSelector(TournamentSelector.getTournament)!;

  return (
    <Row>
      <Col>
        <h2 className="float-left">
          <Badge variant="info">
            <span>Torneo </span>
            <strong>"{tournament.name.toUpperCase()}"</strong>
            <span>
              <i>
                {` - ${formatDate(tournament.date)} `}
                <small> @ {translateTournamentProgress(tournament!.progress)}</small>
              </i>
            </span>
          </Badge>
        </h2>
      </Col>
    </Row>
  );
};

export default TournamentBadge;
