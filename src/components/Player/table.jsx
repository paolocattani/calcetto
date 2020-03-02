import React from 'react';
// bootstrap
import { Button, Row, Col, ListGroup } from 'react-bootstrap';
// react-bootstrap-table
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import cellEditFactory from 'react-bootstrap-table2-editor';
// helper/ style
import './style.css';
import columns, { clearAllFilter, ExportCSVButton } from './helper';
import TableHeader from './header';
import { LoadingModal } from '../core/Commons';

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
        const response = await fetch('/api/player/list', {
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
        const emptyRow = {
          id: null,
          name: '',
          surname: '',
          alias: '',
          role: '',
          match_played: 0,
          match_won: 0,
          total_score: 0,
          editable: true
        };
        const response = await fetch('/api/player', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emptyRow)
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
        const response = await fetch('/api/player', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(selectedRows)
        });
        const result = await response.json();
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

  cellEditProps = cellEditFactory({
    mode: 'click',
    blurToSave: true,
    autoSelectText: true,
    afterSaveCell: (oldValue, newValue, row, column) => {
      (async () => {
        // TODO: gestire try-catch
        const response = await fetch('/api/player', {
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

    return (
      <>
        <LoadingModal show={isLoading} message={'Caricamento'} />
        <Row>
          <Col>
            <ToolkitProvider keyField="id" data={rows} columns={columns} exportCSV>
              {props => (
                <>
                  <ListGroup horizontal>
                    <Button variant="success" onClick={addRow}>
                      Aggiungi giocatore
                    </Button>
                    <Button variant="danger" onClick={deleteRow}>
                      Calcella giocatore
                    </Button>
                    <Button variant="dark" onClick={clearAllFilter.bind(this)}>
                      Pulisci Filtri
                    </Button>
                  </ListGroup>

                  {/* FIXME:
                  <ExportCSVButton {...props.csvProps} />
                  */}
                  <BootstrapTable
                    wrapperClasses="player-table"
                    keyField="id"
                    data={rows}
                    columns={columns}
                    cellEdit={this.cellEditProps}
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
            </ToolkitProvider>
          </Col>
        </Row>
      </>
    );
  }
}
