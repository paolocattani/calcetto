// https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/editing/

// TODO: add Hamoni to sync client
// https://github.com/pmbanugo/realtime-react-datatable

// TODO: bootstrap table
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Cell%20Editing&selectedStory=Click%20to%20Edit&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
// https://github.com/react-bootstrap-table/react-bootstrap-table2

import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { productsGenerator } from './core/utils';

export default class PlayerSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const products = productsGenerator();
    const columns = [
      {
        dataField: 'id',
        text: 'Product ID'
      },
      {
        dataField: 'name',
        text: 'Product Name'
      },
      {
        dataField: 'price',
        text: 'Product Price'
      }
    ];

    return <BootstrapTable keyField="id" data={products} columns={columns} />;
  }
}
