// https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/editing/

// TODO: add Hamoni to sync client
// https://github.com/pmbanugo/realtime-react-datatable

// TODO: bootstrap table
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Cell%20Editing&selectedStory=Click%20to%20Edit&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
// https://github.com/react-bootstrap-table/react-bootstrap-table2

import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { PairsGenerator } from './core/utils';
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

const emptyRow = { id: null, 'pair1.alias': '', 'pair2.alias': '' };
