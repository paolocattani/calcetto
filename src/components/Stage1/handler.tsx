import React, { useState, useEffect } from 'react';
import Stage1Table from './table';
import { handlerPropsType } from './type';
import { columns, rowsGenerator, comparator } from './helper';

const Stage1Handler = (props: handlerPropsType): JSX.Element => {
  const { pairsList } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [saved, setIsSaved] = useState(false);
  const [rows, setRows] = useState(rowsGenerator(pairsList));
  const tableName = pairsList[0]?.stage1Name ?? 'Not found';

  // Aggiornamento dati
  const updateCellValue = async (oldValue: any, newValue: any, row: any, column: any) => {
    const model1 = {
      tId: row.pair.tId,
      tableName,
      score: newValue,
      pair1Id: row.pair.id,
      pair2Id: rows[parseInt(column.text) - 1].pair.id
    };
    const response = await fetch('/api/stage1/cell', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model1)
    });
    await response.json();
    if (response.ok) {
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    }
  };

  // Reperimento dati dal db
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
        // Ordinamento
        [...result]
          .sort((e1, e2) => comparator(e1, e2))
          .forEach((row, index) => (result[row.rowNumber - 1]['place'] = index + 1));
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

  return (
    <>
      {/*saved ? <p>Salvato....</p> : null*/}
      {isLoading ? (
        <h3>
          Caricamento girone <b>{tableName}</b> in corso....
        </h3>
      ) : (
        <Stage1Table
          rows={rows}
          columns={columns(onSelect, pairsList)}
          tableName={tableName}
          updateCellValue={updateCellValue}
          saved={saved}
        />
      )}
    </>
  );
};

export default Stage1Handler;
