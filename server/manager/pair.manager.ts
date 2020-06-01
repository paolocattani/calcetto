import Pair from 'models/sequelize/pair.model';
import { PairDTO } from 'models/dto/pair.dto';

export function rowToModel(row: Pair, index: number): PairDTO {
  return {
    id: row.id,
    rowNumber: index + 1,
    tId: row.tournamentId,
    alias: row.alias,
    stage1Name: row.stage1Name,
    paid1: row.paid1,
    paid2: row.paid2,
    placement: row.placement,
    label: valueFormatter(row),
    player1: {
      id: row.player1?.id ?? null,
      name: row.player1?.name ?? '',
      surname: row.player1?.surname ?? '',
      alias: row.player1?.alias ?? '',
      label: row.player1?.alias ?? '',
      role: row.player1?.role ?? null,
      email: row.player1?.email ?? '',
      phone: row.player1?.phone ?? '',
      match_played: row.player1?.match_played ?? 0,
      match_won: row.player1?.match_won ?? 0,
      total_score: row.player1?.total_score ?? 0,
      editable: row.player1?.editable ?? false,
    },
    player2: {
      id: row.player2?.id ?? null,
      name: row.player2?.name ?? '',
      surname: row.player2?.surname ?? '',
      alias: row.player2?.alias ?? '',
      label: row.player2?.alias ?? '',
      role: row.player2?.role ?? null,
      email: row.player2?.email ?? '',
      phone: row.player2?.phone ?? '',
      match_played: row.player2?.match_played ?? 0,
      match_won: row.player2?.match_won ?? 0,
      total_score: row.player2?.total_score ?? 0,
      editable: row.player2?.editable ?? false,
    },
  };
}

export function valueFormatter(row: any) {
  const { alias, id, player1, player2 } = row;
  if (alias && alias !== '') return `${alias} ( ${id} )`;
  if (!player1 || !player2) return '';
  const value = `${player1.alias ? player1.alias : player1.name} - ${
    player2.alias ? player2.alias : player2.name
  } ( ${id} )`;

  return value;
}
