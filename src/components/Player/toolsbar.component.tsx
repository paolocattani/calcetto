import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from '../core/types';
import { AuthSelector } from '../../redux/selectors';
import commonStyle from '../../common.module.css';
import { HomeIcon, PlusIcon, BroomIcon, TrashIcon } from '../core/icons';
import { clearAllFilter } from './helper';
import { PlayerDTO } from '../../@common/dto';

interface ToolsbarProps {
	selectedLength: number;
	goBack: () => void;
	addEdit: (player?: PlayerDTO) => void;
	deleteRow: () => void;
}

const Toolsbar: React.FC<ToolsbarProps> = ({ selectedLength, goBack, addEdit, deleteRow }) => {
	const isAdmin = useSelector(AuthSelector.isAdmin);

	const { t } = useTranslation(['common', 'pair']);

	return (
		<Row>
			<Col className={commonStyle.toolsBarContainer}>
				<div className={commonStyle.toolsBar}>
					<Button variant="secondary" className="float-left align-middle" onClick={goBack}>
						<HomeIcon />
						<span> {t('common:route.home')}</span>
					</Button>
					{isAdmin ? (
						<Button variant="success" onClick={() => addEdit()}>
							<PlusIcon />
							<span>{t('player:add')}</span>
						</Button>
					) : null}
					<Button variant="dark" onClick={() => clearAllFilter(isAdmin)}>
						<BroomIcon />
						<span> {t('player:filter')}</span>
					</Button>
					{isAdmin ? (
						<Button variant="danger" className="float-right" onClick={deleteRow} disabled={selectedLength === 0}>
							<TrashIcon /> {selectedLength > 1 ? t('player:delete.multi') : t('player:delete.one')}
						</Button>
					) : null}
				</div>
			</Col>
		</Row>
	);
};

export default Toolsbar;
