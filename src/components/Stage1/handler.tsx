import React, { useState, useEffect } from 'react';
import Stage1Table from './table';
import { handlerPropsType } from './type';
import { rowsGenerator, comparator } from './helper';
import { columns } from './editor';
import { Stage1Row } from 'models';

const Stage1Handler = ({ pairsList, autoOrder }: handlerPropsType): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setIsSaved] = useState(false);
  const [rows, setRows] = useState<Stage1Row[]>(rowsGenerator(pairsList));
  const tableName = pairsList[0]?.stage1Name ?? 'Not found';

  // Aggiornamneto posizione coppia
  const updatePlacement = async (rows: Stage1Row[]) => {
    const model = rows.map((e) => ({ id: e.pair.id, placement: e.placement }));
    // console.log('UpdatePlacement : ', model);
    const response = await fetch('/api/v1/stage1/placement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rows: model }),
    });
    await response.json();
  };

  // Aggiornamento dati
  const updateCellValue = async (oldValue: any, newValue: any, row: any, column: any) => {
    // console.log('updateCellValue : ', newValue, row, column);
    const model1 = {
      tId: row.pair.tId,
      tableName,
      score: newValue,
      pair1Id: row.pair.id,
      pair2Id: rows[parseInt(column.text) - 1].pair.id,
    };
    const response = await fetch('/api/v1/stage1/cell', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(model1),
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
        const response = await fetch('/api/v1/stage1', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rows, stageName: tableName }),
        });
        const result = await response.json();
        // FIXME: Ordinamento : gestire ordinamento personalizzato

        if (autoOrder)
          [...result]
            .sort((e1, e2) => comparator(e1, e2))
            .forEach((row, index) => (result[row.rowNumber - 1]['placement'] = index + 1));

        setRows(result);
        setIsLoading(false);
      };
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      {isLoading ? (
        <h3>
          Caricamento girone <b>{tableName}</b> in corso....
        </h3>
      ) : (
        <Stage1Table
          autoOrder={autoOrder}
          rows={rows}
          columns={columns(pairsList)}
          tableName={tableName}
          updateCellValue={updateCellValue}
          updatePlacement={updatePlacement}
          saved={saved}
        />
      )}
    </>
  );
};

export default Stage1Handler;
