import React from 'react';
// bootstrap
import { Button, Row, Col, ListGroup } from 'react-bootstrap';
// react-bootstrap-table
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import cellEditFactory from 'react-bootstrap-table2-editor';
// helper/ style
import './style.css';
import columns, { clearAllFilter } from './helper';
import TableHeader from './header';
import { LoadingModal } from '../core/generic/Commons';
import { getEmptyPlayer } from 'redux/services/player.service';
import { connect } from 'react-redux';

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      selectedRows: [],
      isLoading: false,
    };
    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addRow = this.addRow.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true }, () =>
      (async () => {
        const response = await fetch('/api/v1/player/list', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await response.json();

        this.setState({
          isLoading: false,
          rows: result.map((e, i) => ({ ...e, id: i + 1 })),
        });
      })()
    );
  }

  handleOnSelect = (row, isSelected) => {
    this.setState((state) => {
      const { selectedRows } = state;
      const found = selectedRows.find((e) => e.id === row.id) ? true : false;
      if (isSelected) {
        return found ? { selectedRows: selectedRows } : { selectedRows: [row, ...selectedRows] };
      } else {
        return found ? { selectedRows: selectedRows.filter((e) => e.id !== row.id) } : { selectedRows: selectedRows };
      }
    });
    // return true or dont return to approve current select action
    return true;
  };

  addRow() {
    this.setState({ isLoading: true }, () =>
      (async () => {
        const response = await fetch('/api/v1/player', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(getEmptyPlayer()),
        });
        const result = await response.json();
        this.setState((state) => {
          return {
            rows: [result, ...state.rows],
            isLoading: false,
          };
        });
      })()
    );
  }

  deleteRow() {
    const { selectedRows } = this.state;
    if (!selectedRows) return;
    this.setState({ isLoading: true }, () =>
      (async () => {
        fetch('/api/v1/player', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedRows),
        });
        this.setState((state) => {
          return {
            // Se la riga che sto analizzando è contenuta in quelle selezionata allora non la voglio
            rows: state.rows.filter((row) => !selectedRows.find((selectedRow) => selectedRow.id === row.id)),
            selectedRows: [],
            isLoading: false,
          };
        });
      })()
    );
  }

  cellEditProps = (editabile) =>
    cellEditFactory({
      mode: editabile ? 'click' : 'none',
      blurToSave: true,
      autoSelectText: true,
      afterSaveCell: (oldValue, newValue, row, column) => {
        (async () => {
          // TODO: gestire try-catch
          const response = await fetch('/api/v1/player', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(row),
          });
          await response.json();
        })();
      },
    });

  render() {
    const { state, deleteRow, addRow } = this;
    const { rows, isLoading } = state;
    const selectRow = {
      mode: 'checkbox',
      nonSelectable: rows.filter((e) => !e.editable).map((e) => e.id),
      onSelect: this.handleOnSelect,
      onSelectAll: (isSelected, rows) => rows.forEach((row) => this.handleOnSelect(row, isSelected)),
      style: { backgroundColor: '#c8e6c9' },
      hideSelectAll: !rows.find((e) => e.editable),
      selectColumnStyle: ({ checked, disabled, rowIndex, rowKey }) =>
        rows[rowIndex].editable ? {} : { backgroundColor: '#dc3545' },
    };

    const {
      state: { selectedRows } = [],
      props: { isEditable },
    } = this;

    return (
      <>
        <LoadingModal show={isLoading} message={'Caricamento'} />
        <Row>
          <Col>
            <>
              <ListGroup horizontal>
                {isEditable ? (
                  <Button variant="success" onClick={addRow}>
                    Aggiungi giocatore
                  </Button>
                ) : null}
                {isEditable ? (
                  <Button variant="danger" onClick={deleteRow} disabled={selectedRows.length === 0}>
                    {selectedRows.length > 1 ? 'Elimina giocatori' : 'Elimina giocatore'}
                  </Button>
                ) : null}
                <Button variant="dark" onClick={clearAllFilter.bind(this)}>
                  Pulisci Filtri
                </Button>
              </ListGroup>
              <BootstrapTable
                wrapperClasses="player-table"
                keyField="id"
                data={rows}
                columns={columns(isEditable)}
                cellEdit={this.cellEditProps(isEditable)}
                selectRow={selectRow}
                caption={<TableHeader />}
                filter={filterFactory()}
                headerClasses="default-background default-color-white"
                noDataIndication="Nessun dato reperito"
                striped
                hover
                bootstrap4
              />
            </>
          </Col>
        </Row>
      </>
    );
  }
}

export default connect((state) => ({
  isEditable: state.sessionState.isAdmin,
}))(Player);
