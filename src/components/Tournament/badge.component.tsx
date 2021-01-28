import React from 'react';
import { TournamentSelector } from '../../redux/selectors';
import { useSelector } from '../core/types';
import { Row, Col, Badge } from 'react-bootstrap';
import { formatDate } from '../../@common/utils/date.utils';
import { useTranslation } from 'react-i18next';

interface TournamentBadgeProps {}
const TournamentBadge: React.FC<TournamentBadgeProps> = () => {
	const tournament = useSelector(TournamentSelector.getTournament)!;
	const { t } = useTranslation(['tournament']);
	return (
		<Row>
			<Col>
				<h2 className="float-left">
					<Badge variant="info">
						<span>{t(`tournament:${tournament.public ? 'public' : 'private'}_tournament`)} </span>
						<strong>"{tournament.name.toUpperCase()}"</strong>
						<span>
							<i>
								{` - ${formatDate(tournament.date)} `}
								<small> @ {t(`tournament:progress.${tournament.progress}`)}</small>
								{process.env.NODE_ENV === 'development' ? <strong>{`  --> ( ${tournament.id} )`}</strong> : null}
							</i>
						</span>
					</Badge>
				</h2>
			</Col>
		</Row>
	);
};

export default TournamentBadge;
