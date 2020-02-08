import { Column, Model, Comment, Table, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
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
@Table({ tableName: 's1matrix', freezeTableName: true, version: true })
export default class s1Matrix extends Model<s1Matrix> {
  @Column(DataType.STRING)
  name!: string;

  // Models association
  // Tournament
  @ForeignKey(() => Tournament)
  @Column(DataType.INTEGER)
  public tournamentId?: number;
  @BelongsTo(() => Tournament)
  public tournament!: Tournament;

  @Comment('Pair 1')
  @ForeignKey(() => Pair)
  @Column(DataType.INTEGER)
  public pair1Id!: number;
  @BelongsTo(() => Pair, 'pair1Id')
  public pair1!: Pair;

  @Comment('Pair 2')
  @ForeignKey(() => Pair)
  @Column(DataType.INTEGER)
  public pair2Id!: number;
  @BelongsTo(() => Pair, 'pair2Id')
  public pair2!: Pair;

  // Punteggio totale per la coppia
  @Comment('Score of pair1 vs pair2')
  @Column(DataType.INTEGER)
  public score!: number;

  // Posizionamento della coppia all'interno del girone.
  // Potrebbe essere calcolato progressivamente con un trigger. Da valutare
  @Column(DataType.INTEGER)
  public placement!: number;
}
