import React from 'react';
import { Row, Col, Button, FormControl, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { TournamentProgress } from 'src/@common/dto';
import { AuthSelector } from 'src/redux/selectors';
import { tournament } from 'src/test/commons';
import commonStyle from '../../common.module.css';
import { HomeIcon, PlusIcon, TrashIcon, RightArrowIcon } from '../core/icons';
import { FormEventType } from '../core/types';

interface ToolsbarProps {
	addRow: (index?: number) => Promise<void>;
	addMultipleRows: () => Promise<void>;
	confirmPairs: () => void;
	goBack: () => void;
	deleteStage1: () => void;
	deleteRow: () => Promise<void>;
	availableRows: number;
	stage1Number: number;
	rowsLength: number;
	deleteDisabled: boolean;
	selectedLength: number;
	newRowsNumber: number;
	setStage1Number: React.Dispatch<React.SetStateAction<number>>;
	setStage1Name: () => void;
	setNewRowsNumber: React.Dispatch<React.SetStateAction<number>>;
}

const Toolsbar: React.FC<ToolsbarProps> = ({
	addRow,
	addMultipleRows,
	confirmPairs,
	goBack,
	deleteStage1,
	deleteRow,
	setStage1Number,
	setStage1Name,
	setNewRowsNumber,
	deleteDisabled,
	selectedLength,
	availableRows,
	stage1Number,
	newRowsNumber,
	rowsLength,
	// eslint-disable-next-line sonarjs/cognitive-complexity
}) => {
	const isAdmin = useSelector(AuthSelector.isAdmin);

	const { t } = useTranslation(['common', 'pair']);

	const assignMatches = (
		<InputGroup>
			<InputGroup.Prepend>
				<InputGroup.Text>{t('pair:stage1.set')}</InputGroup.Text>
			</InputGroup.Prepend>
			<FormControl
				placeholder={rowsLength < 4 ? t('pair:error.3') : t('pair:error.4', { max: Math.floor(rowsLength / 4) })}
				type="number"
				step={1}
				min={0}
				max={Math.floor(rowsLength / 4)}
				value={stage1Number !== 0 ? stage1Number : undefined}
				onChange={(event: React.FormEvent<FormEventType>) => setStage1Number(Number(event.currentTarget.value))}
				disabled={
					rowsLength < 4 ||
					tournament.progress === TournamentProgress.Stage1 ||
					tournament.progress === TournamentProgress.Stage2
				}
			/>
			<InputGroup.Append>
				<Button
					variant="primary"
					onClick={setStage1Name}
					disabled={!stage1Number || stage1Number > Math.floor(rowsLength / 4) || rowsLength < 4}
				>
					{t('common:exec')}
				</Button>
			</InputGroup.Append>
		</InputGroup>
	);
	const addPairs = (
		<InputGroup>
			<InputGroup.Prepend>
				<InputGroup.Text>{t('pair:add.multi')}</InputGroup.Text>
			</InputGroup.Prepend>
			<FormControl
				disabled={availableRows <= 0}
				type="number"
				step={1}
				min={1}
				max={availableRows}
				placeholder={availableRows <= 0 ? t('pair:error.1') : t('pair:error.2', { max: availableRows })}
				onChange={(event: React.FormEvent<FormEventType>) => setNewRowsNumber(Number(event.currentTarget.value))}
				value={newRowsNumber || ''}
			/>
			<InputGroup.Append>
				<Button
					variant="primary"
					onClick={(e: any) => setNewRowsNumber(availableRows)}
					disabled={newRowsNumber > availableRows}
				>
					{t('common:max')}
				</Button>
				<Button variant="primary" onClick={addMultipleRows} disabled={!newRowsNumber || newRowsNumber > availableRows}>
					{t('common:exec')}
				</Button>
			</InputGroup.Append>
		</InputGroup>
	);

	return (
		<div className={commonStyle.toolsBarContainer} data-cy="pair-toolbar">
			<Row className={commonStyle.toolsBar}>
				<Col>
					<Button variant="secondary" className="float-left align-middle" onClick={goBack}>
						<HomeIcon /> {t('common:route.home')}
					</Button>
				</Col>

				{tournament.progress > TournamentProgress.PairsSelection ? null : (
					<Col>
						<Button
							variant="success"
							className="align-middle"
							onClick={() => addRow()}
							disabled={availableRows <= 0 || !isAdmin}
						>
							<PlusIcon /> {t('pair:add.one')}
						</Button>
					</Col>
				)}
				{tournament.progress > TournamentProgress.PairsSelection ? null : (
					<Col>
						<Button variant="danger" className="align-middle" onClick={deleteRow} disabled={deleteDisabled || !isAdmin}>
							<TrashIcon /> {selectedLength === 1 ? t('pair:delete.one') : t('pair:delete.multi')}
						</Button>
					</Col>
				)}
				{tournament.progress !== TournamentProgress.Stage1 ? null : (
					<Col>
						<Button variant="danger" className="align-middle" onClick={deleteStage1} disabled={!isAdmin}>
							{t('stage1:reset')}
						</Button>
					</Col>
				)}
				<Col>
					<Button
						variant="outline-warning"
						className="default-color-white float-right align-middle"
						onClick={confirmPairs}
						disabled={!isAdmin}
					>
						<b>{t('common:continue')} </b> <RightArrowIcon />
					</Button>
				</Col>
			</Row>
			{isAdmin && tournament.progress <= TournamentProgress.PairsSelection ? (
				<>
					{assignMatches}
					{addPairs}
				</>
			) : null}
		</div>
	);
};

export default Toolsbar;
