rows.forEach((e, i) => {
  if (i !== 0) return null;
  for (let key in e) {
    if (key.startsWith('col')) {
      //console.log("( key, value ) => ( "+key+" , "+e[key]+" )");
      console.log('( p1 , p2 ) = (' + e.pair.id + ' , ' + rows[key.substring(3)].pair.id + ' ) ');
    }
  }
});

[
  {
    pair: {
      id: 1,
      rowNumber: 1,
      tId: 1,
      player1: {
        id: 6,
        alias: 'Alias6',
        name: 'Nome6',
        surname: 'Cognome6'
      },
      player2: {
        id: 15,
        alias: 'Alias15',
        name: 'Nome15',
        surname: 'Cognome15'
      },
      pairAlias: '',
      stage1Name: '2',
      label: 'Alias6 - Alias15'
    },
    rowNumber: 1,
    col1: '',
    col2: '',
    col3: '',
    col4: '',
    col5: '',
    col6: '',
    col7: '',
    col8: '',
    col9: '',
    col10: '',
    total: 0,
    place: 0
  },
  {
    pair: {
      id: 3,
      rowNumber: 3,
      tId: 1,
      player1: {
        id: 1,
        alias: 'Alias1',
        name: 'Nome1',
        surname: 'Cognome1'
      },
      player2: {
        id: 1,
        alias: 'Alias1',
        name: 'Nome1',
        surname: 'Cognome1'
      },
      pairAlias: '',
      stage1Name: '2',
      label: 'Alias1 - Alias1'
    },
    rowNumber: 2,
    col1: '',
    col2: '',
    col3: '',
    col4: '',
    col5: '',
    col6: '',
    col7: '',
    col8: '',
    col9: '',
    col10: '',
    total: 0,
    place: 0
  },
  {
    pair: {
      id: 5,
      rowNumber: 5,
      tId: 1,
      player1: {
        id: 13,
        alias: 'Alias13',
        name: 'Nome13',
        surname: 'Cognome13'
      },
      player2: {
        id: 15,
        alias: 'Alias15',
        name: 'Nome15',
        surname: 'Cognome15'
      },
      pairAlias: '',
      stage1Name: '2',
      label: 'Alias13 - Alias15'
    },
    rowNumber: 3,
    col1: '',
    col2: '',
    col3: '',
    col4: '',
    col5: '',
    col6: '',
    col7: '',
    col8: '',
    col9: '',
    col10: '',
    total: 0,
    place: 0
  },
  {
    pair: {
      id: 8,
      rowNumber: 8,
      tId: 1,
      player1: {
        id: 7,
        alias: 'Alias7',
        name: 'Nome7',
        surname: 'Cognome7'
      },
      player2: {
        id: 1,
        alias: 'Alias1',
        name: 'Nome1',
        surname: 'Cognome1'
      },
      pairAlias: 'PAlias8',
      stage1Name: '2',
      label: 'PAlias8'
    },
    rowNumber: 4,
    col1: 3,
    col2: '',
    col3: '',
    col4: '',
    col5: '',
    col6: '',
    col7: '',
    col8: '',
    col9: '',
    col10: '',
    total: 0,
    place: 0
  },
  {
    pair: {
      id: 9,
      rowNumber: 9,
      tId: 1,
      player1: {
        id: 16,
        alias: 'Alias16',
        name: 'Nome16',
        surname: 'Cognome16'
      },
      player2: {
        id: 2,
        alias: 'Alias2',
        name: 'Nome2',
        surname: 'Cognome2'
      },
      pairAlias: '',
      stage1Name: '2',
      label: 'Alias16 - Alias2'
    },
    rowNumber: 5,
    col1: '',
    col2: '',
    col3: '',
    col4: '',
    col5: '',
    col6: '',
    col7: '',
    col8: '',
    col9: '',
    col10: '',
    total: 0,
    place: 0
  },
  {
    pair: {
      id: 12,
      rowNumber: 12,
      tId: 1,
      player1: {
        id: 8,
        alias: 'Alias8',
        name: 'Nome8',
        surname: 'Cognome8'
      },
      player2: {
        id: 18,
        alias: 'Alias18',
        name: 'Nome18',
        surname: 'Cognome18'
      },
      pairAlias: 'PAlias12',
      stage1Name: '2',
      label: 'PAlias12'
    },
    rowNumber: 6,
    col1: '',
    col2: '',
    col3: '',
    col4: '',
    col5: '',
    col6: '',
    col7: '',
    col8: '',
    col9: '',
    col10: '',
    total: 0,
    place: 0
  },
  {
    pair: {
      id: 15,
      rowNumber: 15,
      tId: 1,
      player1: {
        id: 7,
        alias: 'Alias7',
        name: 'Nome7',
        surname: 'Cognome7'
      },
      player2: {
        id: 4,
        alias: 'Alias4',
        name: 'Nome4',
        surname: 'Cognome4'
      },
      pairAlias: '',
      stage1Name: '2',
      label: 'Alias7 - Alias4'
    },
    rowNumber: 7,
    col1: '',
    col2: '',
    col3: '',
    col4: '',
    col5: '',
    col6: '',
    col7: '',
    col8: '',
    col9: '',
    col10: '',
    total: 0,
    place: 0
  },
  {
    pair: {
      id: 17,
      rowNumber: 17,
      tId: 1,
      player1: {
        id: 2,
        alias: 'Alias2',
        name: 'Nome2',
        surname: 'Cognome2'
      },
      player2: {
        id: 11,
        alias: 'Alias11',
        name: 'Nome11',
        surname: 'Cognome11'
      },
      pairAlias: '',
      stage1Name: '2',
      label: 'Alias2 - Alias11'
    },
    rowNumber: 8,
    col1: '',
    col2: '',
    col3: '',
    col4: '',
    col5: '',
    col6: '',
    col7: '',
    col8: '',
    col9: '',
    col10: '',
    total: 0,
    place: 0
  },
  {
    pair: {
      id: 18,
      rowNumber: 18,
      tId: 1,
      player1: {
        id: 5,
        alias: 'Alias5',
        name: 'Nome5',
        surname: 'Cognome5'
      },
      player2: {
        id: 10,
        alias: 'Alias10',
        name: 'Nome10',
        surname: 'Cognome10'
      },
      pairAlias: 'PAlias18',
      stage1Name: '2',
      label: 'PAlias18'
    },
    rowNumber: 9,
    col1: '',
    col2: '',
    col3: '',
    col4: '',
    col5: '',
    col6: '',
    col7: '',
    col8: '',
    col9: '',
    col10: '',
    total: 0,
    place: 0
  },
  {
    pair: {
      id: 20,
      rowNumber: 20,
      tId: 1,
      player1: {
        id: 16,
        alias: 'Alias16',
        name: 'Nome16',
        surname: 'Cognome16'
      },
      player2: {
        id: 3,
        alias: 'Alias3',
        name: 'Nome3',
        surname: 'Cognome3'
      },
      pairAlias: 'PAlias20',
      stage1Name: '2',
      label: 'PAlias20'
    },
    rowNumber: 10,
    col1: '',
    col2: '',
    col3: '',
    col4: '',
    col5: '',
    col6: '',
    col7: '',
    col8: '',
    col9: '',
    col10: '',
    total: 0,
    place: 0
  }
];
