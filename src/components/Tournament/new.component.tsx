import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

// Date picker
import DatePicker from 'react-datepicker';
import { getEmptyTournament } from './helper';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { TournamentAction } from '../../redux/actions/tournament.action';
import { toast } from 'react-toastify';
import { FormEventType } from '../core/types';
import { useTranslation } from 'react-i18next';

interface NewTournamentProps {}

const NewTournament: React.FC<NewTournamentProps> = () => {
	const currentHistory = useHistory();
	const dispatch = useDispatch();
	const { t } = useTranslation(['common', 'tournament']);

	const [name, setName] = useState<string>('');
	const [date, setDate] = useState<Date>(new Date());
	const [visible, setVisible] = useState<boolean>(true);

	const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>): Promise<void> => {
		evt.preventDefault();
		if (!name) {
			toast.error(t('tournament:error.name'));
			return;
		}

		const tournament = getEmptyTournament(name);
		tournament.date = date;
		tournament.public = visible;
		dispatch(TournamentAction.save.request({ tournament, history: currentHistory }));
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Row>
				<Col md={6}>
					{/* FIXME: use <Input /> element */}
					<Form.Group controlId="formBasicEmail">
						<Form.Label>{t('tournament:name')}</Form.Label>
						<Form.Control
							data-cy="new-name"
							type="text"
							required
							placeholder={t('tournament:name')}
							maxLength={30}
							value={name}
							onChange={(event: React.FormEvent<FormEventType>) => setName(event.currentTarget.value)}
						/>
					</Form.Group>
				</Col>
				<Col md={3}>
					<Form.Group>
						<Form.Label>{t('tournament:date')}</Form.Label>
						<Form.Control
							data-cy="new-date"
							as={() => (
								<DatePicker
									highlightDates={[new Date()]}
									locale="it"
									selected={date}
									dateFormat="dd/MM/yyyy"
									onChange={(newValue: Date) => setDate(newValue)}
								/>
							)}
						></Form.Control>
					</Form.Group>
				</Col>

				<Col md={3}>
					<Form.Group controlId="visible">
						<Form.Label>{t('tournament:visibility')} </Form.Label>
						<Form.Control as="select" onChange={() => setVisible(!visible)} data-cy="new-visibility">
							<option>{t('tournament:public')}</option>
							<option>{t('tournament:private')}</option>
						</Form.Control>
					</Form.Group>
				</Col>
			</Form.Row>
			<Form.Row>
				<Col>
					<Button
						disabled={!name}
						type="submit"
						size="lg"
						variant="outline-warning"
						data-cy="new-submit"
						className="float-right default-color-white"
					>
						<span style={{ fontSize: 'larger', fontWeight: 'bolder' }}>{t('common:continue')}</span>
					</Button>
				</Col>
			</Form.Row>
		</Form>
	);
};

export default NewTournament;
