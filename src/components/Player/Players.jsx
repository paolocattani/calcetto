// https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/editing/

// TODO: add Hamoni to sync client
// https://github.com/pmbanugo/realtime-react-datatable

// TODO: bootstrap table
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Cell%20Editing&selectedStory=Click%20to%20Edit&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
// https://github.com/react-bootstrap-table/react-bootstrap-table2

import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { productsGenerator } from '../core/utils';
// react-bootstrap-table
import { Button, Row } from 'react-bootstrap';
import cellEditFactory, { Type } from 'react-bootstrap-table2-editor';

const columns = [
  { dataField: 'id', text: 'ID', editable: false },
  { dataField: 'name', text: 'Nome' },
  { dataField: 'surname', text: 'Cognome' },
  { dataField: 'alias', text: 'Vero Nome' },
  {
    dataField: 'role',
    text: 'Roulo',
    editor: {
      type: Type.SELECT,
      options: [
        { value: 'goalkeeper', label: 'Portiere' },
        { value: 'striker', label: 'Attaccante' },
        { value: 'both', label: 'Master' }
      ]
    }
  },
  { dataField: 'match_played', text: 'Partite Giocate', hidden: true },
  { dataField: 'match_won', text: 'Vittorie', hidden: true },
  { dataField: 'total_score', text: 'Punteggio', hidden: true }
];

export default class PlayerSelection extends React.Component {
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
    console.table(result);
    this.setState({ rows: result });
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
        const emptyRow = {
          id: null,
          name: '',
          surname: '',
          alias: '',
          role: '',
          match_played: 0,
          match_won: 0,
          total_score: 0
        };
        return { rows: [emptyRow, ...state.rows] };
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
    })();
    const tmp = [];
    this.setState(state => {
      return {
        // Se la riga che sto analizzando è contenuta in quelle selezionata allora non la voglio
        rows: state.rows.filter(row => !selectedRows.find(selectedRow => selectedRow.id == row.id)),
        selectedRows: []
      };
    });
  }

  render() {
    const cellEditProps = cellEditFactory({
      mode: 'click',
      blurToSave: true,
      afterSaveCell: (oldValue, newValue, row, column) => {
        console.log('after save cell :', newValue, oldValue);
        console.log('after save cell :', row);
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

    const { rows } = this.state;
    return (
      <>
        <Row>
          <Button onClick={this.rowEvents.onDoubleClick}> Aggiungi giocatore </Button>
          <Button variant="danger" onClick={this.deleteRow}>
            {' '}
            Calcella giocatore{' '}
          </Button>
        </Row>
        <Row>
          <br></br>
          <BootstrapTable
            keyField="id"
            data={rows}
            columns={columns}
            rowEvents={this.rowEvents}
            cellEdit={cellEditProps}
            selectRow={selectRow}
            noDataIndication="Nessun dato reperito"
            striped
            hover
            bootstrap4
          />
        </Row>
      </>
    );
  }
}
