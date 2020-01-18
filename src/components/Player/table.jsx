import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
// react-bootstrap-table
import { Button, Row } from 'react-bootstrap';
import cellEditFactory from 'react-bootstrap-table2-editor';
import filterFactory from 'react-bootstrap-table2-filter';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import './style.css';

import columns, { clearAllFilter, ExportCSVButton } from './helper';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      selectedRows: []
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/api/player/list', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    //console.table(result);
    // console.log(({ id, name, surname, role, match_played, match_won, total_score } = e));
    this.setState({
      rows: result.map(e => ({
        id: e.id,
        name: e.name,
        surname: e.surname,
        role: e.role,
        match_played: e.match_played,
        match_won: e.match_won,
        total_score: e.total_score
      }))
    });
  }

  onSubmit(event, formState) {
    console.log('formSubmit : ', formState);
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

  rowEvents = {
    // Add 1 row
    onDoubleClick: (/*e, row, rowIndex*/) =>
      this.setState(state => {
        return {
          rows: [
            {
              id: null,
              name: '',
              surname: '',
              alias: '',
              role: '',
              match_played: 0,
              match_won: 0,
              total_score: 0
            },
            ...state.rows
          ]
        };
      })
  };

  deleteRow() {
    const { selectedRows } = this.state;
    (async () => {
      const response = await fetch('/api/player', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedRows)
      });
      const result = await response.json();
      console.table(result);
      this.setState(state => {
        return {
          // Se la riga che sto analizzando è contenuta in quelle selezionata allora non la voglio
          rows: state.rows.filter(row => !selectedRows.find(selectedRow => selectedRow.id === row.id)),
          selectedRows: []
        };
      });
    })();
  }

  render() {
    const cellEditProps = cellEditFactory({
      mode: 'click',
      blurToSave: true,
      afterSaveCell: (oldValue, newValue, row, column) => {
        console.log('after save cell :', row, newValue, oldValue);
        // [Using an IIFE](https://medium.com/javascript-in-plain-english/https-medium-com-javascript-in-plain-english-stop-feeling-iffy-about-using-an-iife-7b0292aba174)
        (async () => {
          const response = await fetch('/api/player', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(row)
          });
          const result = await response.json();
          console.table(result);
        })();
      }
    });

    const selectRow = {
      mode: 'checkbox',
      // clickToSelect: true,
      // hideSelectAll: true,
      onSelect: this.handleOnSelect
    };
    const { state, rowEvents, deleteRow } = this;
    const { rows } = state;
    return (
      <>
        <Row>
          <ToolkitProvider keyField="id" data={rows} columns={columns} exportCSV>
            {props => (
              <>
                <Button variant="success" onClick={rowEvents.onDoubleClick}>
                  Aggiungi giocatore
                </Button>
                <Button variant="danger" onClick={deleteRow}>
                  Calcella giocatore
                </Button>
                <Button variant="dark" onClick={clearAllFilter.bind(this)}>
                  Pulisci Filtri
                </Button>
                {/* FIXME: */}
                <ExportCSVButton {...props.csvProps} />
                <BootstrapTable
                  wrapperClasses="player-table"
                  keyField="id"
                  data={rows}
                  columns={columns}
                  rowEvents={this.rowEvents}
                  cellEdit={cellEditProps}
                  selectRow={selectRow}
                  filter={filterFactory()}
                  // defaultSorted={defaultSorted}
                  headerClasses="player-table-header"
                  // rowClasses="player-table-rows"
                  noDataIndication="Nessun dato reperito"
                  striped
                  hover
                  //bootstrap4
                  //condensed
                />
              </>
            )}
          </ToolkitProvider>
        </Row>
      </>
    );
  }
}
