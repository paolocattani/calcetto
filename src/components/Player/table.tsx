import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BootstrapTable, { ColumnDescription, SelectRowProps } from 'react-bootstrap-table-next';
// style
import { Button, Row, Col } from 'react-bootstrap';
import './style.css';
import commonStyle from '../../common.module.css';
//
import columns, { clearAllFilter, cellEditProps, filterFactory } from './helper';
import TableHeader from './header';
import { LoadingModal } from '../core/generic/Commons';

import { PlayerDTO } from 'redux/models';
import { PlayerAction } from 'redux/actions';
import { getEmptyPlayer } from 'redux/services/player.service';
import { PlayerSelector, SessionSelector } from 'redux/selectors';
import { TrashIcon, PlusIcon, BroomIcon, HomeIcon } from '../core/icons';

interface PlayerProps {}
const PlayerTable: React.FC<PlayerProps> = () => {
  const dispatch = useDispatch();
  const currentHistory = useHistory();
  // From Store
  const isLoading = useSelector(PlayerSelector.isLoading);
  const isAdmin = useSelector(SessionSelector.isAdmin);
  const playersList = useSelector(PlayerSelector.getPlayersList);
  // Component State
  const [selectedRows, setSelectedRows] = useState<PlayerDTO[]>([]);

  // Effetcs
  useEffect(() => {
    dispatch(PlayerAction.getPlayers.request({}));
  }, [dispatch]);

  const toolsBar = () => (
    <Col className={commonStyle.toolsBarContainer}>
      <div className={commonStyle.toolsBar}>
        <Button variant="secondary" className="float-left align-middle" onClick={goBack}>
          <HomeIcon />
          <span> Home</span>
        </Button>
        {isAdmin ? (
          <Button variant="success" onClick={addRow}>
            <PlusIcon />
            <span> Aggiungi giocatore</span>
          </Button>
        ) : null}
        <Button variant="dark" onClick={clearAllFilter}>
          <BroomIcon />
          <span> Pulisci Filtri</span>
        </Button>
        {isAdmin ? (
          <Button variant="danger" className="float-right" onClick={deleteRow} disabled={selectedRows.length === 0}>
            <TrashIcon /> {selectedRows.length > 1 ? 'Elimina giocatori' : 'Elimina giocatore'}
          </Button>
        ) : null}
      </div>
    </Col>
  );

  const handleOnSelect = (row: PlayerDTO, isSelected: boolean) => {
    setSelectedRows((prevValue) =>
      !!prevValue.find((e) => e.id === row.id)
        ? isSelected
          ? selectedRows
          : selectedRows.filter((e) => e.id !== row.id)
        : isSelected
        ? [row, ...selectedRows]
        : selectedRows
    );
    return true;
  };

  const selectRow: SelectRowProps<PlayerDTO> = {
    mode: 'checkbox',
    nonSelectable: playersList.filter((e) => e.id && !e.editable).map((e) => e.id!),
    onSelect: handleOnSelect,
    onSelectAll: (isSelected, rows) => rows.forEach((row) => handleOnSelect(row, isSelected)),
    style: { backgroundColor: '#c8e6c9' },
    hideSelectAll: !playersList.find((e) => e.editable),
    selectColumnStyle: ({ checked, disabled, rowIndex, rowKey }) =>
      playersList[rowIndex].editable ? {} : { backgroundColor: '#dc3545' },
  };

  const addRow = () => dispatch(PlayerAction.savePlayer.request({ player: getEmptyPlayer() }));
  const deleteRow = () => {
    if (!selectedRows) return;
    dispatch(PlayerAction.deletePlayers.request({ players: selectedRows }));
    setSelectedRows([]);
  };

  function goBack() {
    currentHistory.push('/');
  }

  return (
    <>
      <LoadingModal show={isLoading} message={'Caricamento'} />
      <Col>
        <Row>{toolsBar()}</Row>
        <Row>
          <Col>
            <BootstrapTable
              bootstrap4
              keyField="id"
              data={playersList}
              columns={columns(isAdmin) as ColumnDescription<PlayerDTO, PlayerDTO>[]}
              cellEdit={cellEditProps(isAdmin, (player: PlayerDTO) =>
                dispatch(PlayerAction.savePlayer.request({ player }))
              )}
              selectRow={selectRow}
              caption={<TableHeader />}
              filter={filterFactory}
              headerClasses="default-background default-color-yellow"
              noDataIndication={() => <p>Nessun dato reperito</p>}
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
