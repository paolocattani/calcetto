import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
// style
import { Button, Row, Col } from 'react-bootstrap';
import commonStyle from '../../common.module.css';
//
import columns, { clearAllFilter, filterFactory } from './helper';
import TableHeader from '../core/generic/TableHeader';
import { LoadingModal } from '../core/generic/Commons';

import { PlayerAction } from 'redux/actions';
import { getEmptyPlayer } from 'redux/services/player.service';
import { PlayerSelector, AuthSelector } from 'redux/selectors';
import { TrashIcon, PlusIcon, BroomIcon, HomeIcon } from '../core/icons';
import { useTranslation } from 'react-i18next';
import { PlayerDTO } from '@common/dto';

interface PlayerProps {}
const PlayerTable: React.FC<PlayerProps> = () => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  const { t } = useTranslation(['common', 'player']);
  // From Store
  const isLoading = useSelector(PlayerSelector.isLoading);
  const isAdmin = useSelector(AuthSelector.isAdmin);
  const playersList = useSelector(PlayerSelector.getPlayersList);
  const isSaving = useSelector(PlayerSelector.isSaving);
  // Component State
  const [selectedRows, setSelectedRows] = useState<PlayerDTO[]>([]);

  // Effetcs
  useEffect(() => {
    dispatch(PlayerAction.fetchPlayers.request({}));
  }, [dispatch]);

  const toolsBar = () => (
    <Col className={commonStyle.toolsBarContainer}>
      <div className={commonStyle.toolsBar}>
        <Button variant="secondary" className="float-left align-middle" onClick={goBack}>
          <HomeIcon />
          <span> {t('common:route.home')}</span>
        </Button>
        {isAdmin ? (
          <Button variant="success" onClick={() => addEdit(getEmptyPlayer())}>
            <PlusIcon />
            <span>{t('player:add')}</span>
          </Button>
        ) : null}
        <Button variant="dark" onClick={() => clearAllFilter(isAdmin)}>
          <BroomIcon />
          <span> {t('player:filter')}</span>
        </Button>
        {isAdmin ? (
          <Button variant="danger" className="float-right" onClick={deleteRow} disabled={selectedRows.length === 0}>
            <TrashIcon /> {selectedRows.length > 1 ? t('player:delete.multi') : t('player:delete.one')}
          </Button>
        ) : null}
      </div>
    </Col>
  );

  const handleOnSelect = (row: PlayerDTO, isSelected: boolean) => {
    setSelectedRows((rows) => {
      const found = !!rows.find((e) => e.id === row.id);
      if (isSelected) {
        return found ? rows : [row, ...rows];
      } else {
        return found ? rows.filter((e) => e.id !== row.id) : rows;
      }
    });
    return true;
  };

  const selectRow: SelectRowProps<PlayerDTO> = {
    mode: 'checkbox',
    nonSelectable: playersList.filter((e) => e.id && !e.editable).map((e) => e.id!),
    onSelect: handleOnSelect,
    onSelectAll: (isSelected, rows) => rows.forEach((row) => handleOnSelect(row, isSelected)),
    style: { backgroundColor: '#c8e6c9' },
    hideSelectAll: !playersList.find((e) => e.editable),
    hideSelectColumn: !playersList.find((e) => e.editable) || !isAdmin,
    selectColumnStyle: ({ checked, disabled, rowIndex, rowKey }) =>
      playersList[rowIndex].editable ? {} : { backgroundColor: '#dc3545' },
  };

  const addEdit = (player: PlayerDTO) => {
    console.log('addEdit : ', player);
    dispatch(PlayerAction.setPlayer(player));
    currentHistory.push('/player/edit');
  };

  const deleteRow = () => {
    if (!selectedRows) return;
    dispatch(PlayerAction.deletePlayers.request({ players: selectedRows }));
    setSelectedRows([]);
  };

  function goBack() {
    currentHistory.push('/');
  }

  const fieldLabels = {
    name: t('player:field.name'),
    surname: t('player:field.surname'),
    alias: t('player:field.alias'),
    role: t('player:field.role'),
    email: t('player:field.email'),
    phone: t('player:field.phone'),
    filter: t('player:field.filter'),
    goalKeeper: t('player:role.goalKeeper'),
    striker: t('player:role.striker'),
    master: t('player:role.master'),
    edit: t('common:edit'),
  };
  return (
    <>
      <LoadingModal show={isLoading} message={t('common:loading')} />
      <Col>
        <Row>{toolsBar()}</Row>
        <Row>
          <Col>
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={playersList}
              columns={columns(isAdmin, fieldLabels, addEdit) as ColumnDescription<PlayerDTO, PlayerDTO>[]}
              selectRow={selectRow}
              caption={<TableHeader title={'common:route.player'} saved={isSaving} />}
              filter={filterFactory}
              headerClasses="default-background default-color-yellow"
              noDataIndication={() => <p>{t('player:data')}</p>}
              striped
              hover
            />
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default withRouter(PlayerTable);
