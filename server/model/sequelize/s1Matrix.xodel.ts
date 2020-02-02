import {
  AutoIncrement,
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  ForeignKey,
  HasOne,
  DataType
} from 'sequelize-typescript';
import Pair from './pair.model';
import Tournament from './tournament.model';

/**
 * https://stackoverflow.com/questions/2142566/storing-matrices-in-a-relational-database
 *
 * Rapprenta un Coppia all'interno del Girone :
 *  - questa struttare dovrebbe permettermi di aggiungere coppie dinamicamente senza problemi.
 *
 * - Totale coppia
 *  Select sum(score) from matrice
 *      where idCoppia=? and idTorneo=? group by idTorneo,idCoppia
 *
 * - Posizionamento all'interno del girone
 *  Select row_number,idCoppia from matrice
 *      where idTorneo=? order by idTorneo, score desc
 *
 */
@Table({ tableName: 's1matrix', version: true })
export default class s1Matrix extends Model<s1Matrix> {
  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.INTEGER)
  @ForeignKey(() => Tournament)
  tournamentId!: number;

  @Column(DataType.INTEGER)
  @ForeignKey(() => Pair)
  pairId!: number;

  // Punteggio totale per la coppia
  @Column(DataType.INTEGER)
  score!: number;

  // Posizionamento della coppia all'interno del girone.
  // Potrebbe essere calcolato progressivamente con un trigger. Da valutare
  @Column(DataType.INTEGER)
  placement!: number;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  @HasOne(() => Pair, 'pairId')
  pair!: Pair;
}
