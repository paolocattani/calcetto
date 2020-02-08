import React, { useState, useEffect, useCallback } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { columns, rowsGenerator, cellEditProps } from './helper';
import TableHeader from './header';
import './style.css';

const Stage1Table = ({ pairsList }) => {
  const [rows, setRows] = useState(rowsGenerator(pairsList));
  const tableName = pairsList[0]?.stage1Name ?? 'Not found';

  /**
   * L'idea di base è che al primo giro rows sarà vuoto e viene popolato con gli eventuali dati presi da db.
   * Le esecuzioni successive serviranno a aggiornare i dati sul db.
   *
   * useCallback fa in modo che l'effetto nel quale è definat la funzione ( updateRows )
   * non sia ( erroneamente ) eseguito ad ogni re-render.
   *
   */
  const updateRows = useCallback(() => {
    (async () => {
      console.log('executing effects in ', tableName);
      const response = await fetch('/api/stage1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rows, stageName: tableName })
      });
      const result = await response.json();
      console.log('updateRows effects : ', result);
    })();
  }, [rows, tableName]);

  useEffect(() => updateRows(), [updateRows]);

  const onSelect = () => {
    console.log('onSelect ');
  };

  console.log('render table : ', rows);
  if (rows.length > 0) {
    let rowIndex = 3;
    let colIndex = 1;
    rows[rowIndex][`col${colIndex}`] = 3;
  }
  return pairsList ? (
    <>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={rows}
        columns={columns(onSelect, pairsList)}
        cellEdit={cellEditProps}
        noDataIndication="Nessun dato reperito"
        wrapperClasses="player-table"
        headerClasses="player-table-header"
        caption={<TableHeader title={tableName} />}
        striped
        hover
      />
    </>
  ) : null;
};

export default Stage1Table;
