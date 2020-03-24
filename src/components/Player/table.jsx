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
import { LoadingModal } from '../core/Commons';
import { getEmptyPlayer } from '../Player/helper';
import { SessionContext, isEditable } from '../core/SessionContext';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      selectedRows: [],
      isLoading: false
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
          headers: { 'Content-Type': 'application/json' }
        });
        const result = await response.json();
        this.setState({
          isLoading: false,
          rows: result
        });
      })()
    );
  }

  handleOnSelect = (row, isSelected) => {
    this.setState(state => {
      const { selectedRows } = state;
      const found = selectedRows.find(e => e.id === row.id) ? true : false;
      if (isSelected) {
        return found ? { selectedRows: selectedRows } : { selectedRows: [row, ...selectedRows] };
      } else {
        return found ? { selectedRows: selectedRows.filter(e => e.id !== row.id) } : { selectedRows: selectedRows };
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
          body: JSON.stringify(getEmptyPlayer())
        });
        const result = await response.json();
        this.setState(state => {
          return {
            rows: [result, ...state.rows],
            isLoading: false
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
          body: JSON.stringify(selectedRows)
        });
        this.setState(state => {
          return {
            // Se la riga che sto analizzando è contenuta in quelle selezionata allora non la voglio
            rows: state.rows.filter(row => !selectedRows.find(selectedRow => selectedRow.id === row.id)),
            selectedRows: [],
            isLoading: false
          };
        });
      })()
    );
  }

  cellEditProps = editabile =>
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
            body: JSON.stringify(row)
          });
          await response.json();
        })();
      }
    });

  render() {
    const { state, deleteRow, addRow } = this;
    const { rows, isLoading } = state;
    const selectRow = {
      mode: 'checkbox',
      nonSelectable: rows.filter(e => (e.editable ? false : true)).map(e => e.id),
      onSelect: this.handleOnSelect,
      onSelectAll: (isSelected, rows) => rows.forEach(row => this.handleOnSelect(row, isSelected)),
      style: { backgroundColor: '#c8e6c9' },
      selectColumnStyle: ({ checked, disabled, rowIndex, rowKey }) =>
        rows[rowIndex].editable ? { backgroundColor: '#28a745' } : { backgroundColor: '#dc3545' }
    };

    // console.log('Render player : ', { ...this.props });

    return (
      <SessionContext.Consumer>
        {([session]) => (
          <>
            <LoadingModal show={isLoading} message={'Caricamento'} />
            <Row>
              <Col>
                <>
                  <ListGroup horizontal>
                    {isEditable(session) ? (
                      <Button variant="success" onClick={addRow}>
                        Aggiungi giocatore
                      </Button>
                    ) : null}
                    {isEditable(session) ? (
                      <Button variant="danger" onClick={deleteRow}>
                        Calcella giocatore
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
                    columns={columns(isEditable(session))}
                    cellEdit={this.cellEditProps(isEditable(session))}
                    selectRow={selectRow}
                    caption={<TableHeader />}
                    filter={filterFactory()}
                    headerClasses="player-table-header"
                    noDataIndication="Nessun dato reperito"
                    striped
                    hover
                    bootstrap4
                  />
                </>
                )}
              </Col>
            </Row>
          </>
        )}
      </SessionContext.Consumer>
    );
  }
}
