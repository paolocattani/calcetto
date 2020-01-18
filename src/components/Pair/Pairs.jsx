import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { PairsGenerator } from '../core/utils';
// react-bootstrap-table
import { Button } from 'react-bootstrap';
import cellEditFactory from 'react-bootstrap-table2-editor';

export default class PlayerSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playersList: [],
      rows: PairsGenerator()
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  /*
  async componentDidMount() {
    const response = await fetch('/api/player/list', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    console.table(result);
    this.setState({ playersList: result });
  }
*/
  onSubmit(event, formState) {
    console.log('formSubmit : ', formState);
  }

  rowEvents = {
    // Add 1 row
    onDoubleClick: (e, row, rowIndex) => {
      const { rows } = this.state;
      // console.log(rows);
      const emptyRow = { id: rows.length, 'pair1.alias': '', 'pair2.alias': '' };
      this.setState(state => {
        return { rows: [emptyRow, ...state.rows] };
      });
    }
  };

  render() {
    const columns = [
      { dataField: 'id', text: 'ID', editable: false },
      { dataField: 'pair1.alias', text: 'Nome1' },
      { dataField: 'pair2.alias', text: 'Nome2' }
    ];

    const cellEditProps = cellEditFactory({
      mode: 'click',
      blurToSave: true
      // afterSave : save data to Db
    });

    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      hideSelectAll: true,
      onSelect: this.handleOnSelect
    };

    const { rows } = this.state;

    return (
      <>
        <Button onClick={this.rowEvents.onDoubleClick}> Aggiungi Coppia </Button>
        <Button onClick={this.rowEvents.onDoubleClick}> Conferma Coppie </Button>

        <BootstrapTable
          bootstrap4
          keyField="id"
          data={rows}
          columns={columns}
          rowEvents={this.rowEvents}
          cellEdit={cellEditProps}
          noDataIndication="Nessun dato reperito"
          striped
          hover
        />
      </>
    );
  }
}
