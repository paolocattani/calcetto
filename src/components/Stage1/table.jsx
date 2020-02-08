import React, { useState, useEffect, useCallback } from 'react';
// table
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
// helper
import { columns, rowsGenerator } from './helper';
import TableHeader from './header';
// style
import './style.css';

const Stage1Table = ({ pairsList }) => {
  const [rows, setRows] = useState(rowsGenerator(pairsList));
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setIsSaved] = useState(false);
  const tableName = pairsList[0]?.stage1Name ?? 'Not found';

  /**
   * L'idea di base è che al primo giro rows sarà vuoto e viene popolato con gli eventuali dati presi da db.
   * Le esecuzioni successive serviranno a aggiornare i dati sul db.
   *
   * useCallback fa in modo che l'effetto nel quale è definat la funzione ( updateRows )
   * non sia ( erroneamente ) eseguito ad ogni re-render.
   *
   * https://github.com/facebook/react/issues/15858
   */
  const saveRows = async () => {
    setTimeout(() => {}, 7000);
    const response = await fetch('/api/stage1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rows, stageName: tableName })
    });
    await response.json();
    //  https://github.com/facebook/react/issues/15858
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  useEffect(
    () => {
      const fetchData = async () => {
        setIsLoading(true);
        if (tableName === '1') console.log('executing effects in ', tableName);
        const response = await fetch('/api/stage1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rows, stageName: tableName })
        });
        const result = await response.json();
        setRows(result);
        setIsLoading(false);
        if (tableName === '1') console.log('updateRows effects : ', result);
      };
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onSelect = () => {
    if (tableName === '1') console.log('onSelect ');
  };

  // dummy data
  /*
  let rowIndex = 3;
  let colIndex = 1;
  rows[rowIndex][`col${colIndex}`] = 3;
*/
  const cellEditProps = cellEditFactory({
    mode: 'click',
    blurToSave: true,
    beforeSaveCell: () => {
      if (tableName === '1') console.log('Before save');
    },
    afterSaveCell: () => {
      if (tableName === '1') console.log('After save : ', rows);
      saveRows();
    }
  });

  if (tableName === '1') console.log('Rendering table ', tableName, rows);
  return (
    <>
      {/*saved ? <h2>Salvato...</h2> : null*/}
      {isLoading ? (
        <h3>
          Caricamento girone <b>{tableName}</b> in corso....
        </h3>
      ) : (
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
      )}
    </>
  );
};

export default Stage1Table;
