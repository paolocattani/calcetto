/*
	_______________________________________________________________________
	|      |                      |                   |                   |     Alla fine sono riuscito a risalire ad un algoritmo ! ( dopo 2 giorni )
	|      |     16 coppie        |     8 Coppie      |   4 Coppie        |     Escludendo li primo elemento e ossevando i le righe da 2 a 16 si
	|______|______________________|___________________|___________________|     può notare che la seguenza ha la forma di una piramide :
	|      |                      |                   |                   |
	|  1   | 1 - 2 - 4 - 8 - 16   | 1 - 2 - 4 - 8     | 1 - 2 - 4         |  	     |                               5
	|  2   | 1                    | 1                 | 1                 |  	     |               4                               4
	|  3   | 1 - 2                | 1 - 2             | 1 - 2             |  	     |       3               3               3               3
	|  4   | 1                    | 1                 | 1                 |  	     |   2       2       2       2       2       2       2       2
	|  5   | 1 - 2 - 4            | 1 - 2 - 4         |                   |  	     | 1   1   1   1   1   1   1   1   1   1   1   1   1   1   1   1
	|  6   | 1                    | 1                 |                   |  	_____|_________________________________________________________________
	|  7   | 1 - 2                | 1 - 2             |                   |  	n.   | 2 3 4 5 6 7 8 9 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 3 3 3
	|  8   | 1                    | 1                 |                   |  	Riga |                 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2
	|  9   | 1 - 2 - 4 - 8        |                   |                   |
	|  10  | 1                    |                   |                   |  	Posso calcolare un array contenente il numero di elementi che ogni riga deve contenere.
	|  11  | 1 - 2                |                   |                   |
	|  12  | 1                    |                   |                   |  	- Partendo ad esempio da un array vuoto :
	|  13  | 1 - 2 - 4            |                   |                   |  	- Inizializzo una variabile "currentMax" a 1
	|  14  | 1                    |                   |                   |  	- Se l'elemento con indice "ii" dell'array non contiene nessun valore allora gli assegno "currentMax".
	|  15  | 1 - 2                |                   |                   |  	- Il fattore distanziale tra un elemento e l'altro è : growFactor = Math.pow(2, currentMax);
	|  16  | 1                    |                   |                   |  	- Dato jj = Numero di multipli da calcolare ( è sufficiente jj < pairsNumber )
	|______|______________________|___________________|___________________|  	- Tutti gli elementi con indice jj = ii + growFactor * jj hanno quindi valore "currentMax"

*/

export const getIndexes = (pairsNumber: number): number[] => {
  const N = getBaseLog(2, pairsNumber) + 1; // Numero di elementi td
  /*
   * Array per mappare numero riga a numero di elementi td
   * Inizializzo come primo NaN solo per avere un placeholder all'index 0
   * e iniziare l'analisi da 1
   */
  let indexes = [NaN, N];
  let currentMax = 1;
  for (let ii = 1; ii <= pairsNumber; ii++) {
    if (!indexes[ii]) {
      indexes[ii] = currentMax;
      let growFactor = Math.pow(2, currentMax);
      for (let jj = 1; ii + growFactor * jj < pairsNumber + 1; jj++) indexes[ii + growFactor * jj] = currentMax;
      currentMax++;
    }
  }
  return indexes;
};

function getBaseLog(x: number, y: number) {
  return Math.log(y) / Math.log(x);
}
