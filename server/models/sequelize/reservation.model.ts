import { Column, Model, Table, Comment, DataType, ForeignKey, AllowNull, BelongsTo } from 'sequelize-typescript';
import Player from './player.model';

/**
 *
 */
@Table({ tableName: 'reservation', freezeTableName: true, version: false })
export default class Resevation extends Model<Resevation> {
  @Comment('Reservaion date')
  @Column(DataType.DATE)
  public date!: Date;

  // Eventuali informazioni di chi ha effettuato la prenotazione
  @AllowNull
  @Column(DataType.STRING)
  public name?: string;

  @AllowNull
  @Column(DataType.STRING)
  public surname?: string;

  @AllowNull
  @Column(DataType.STRING)
  public email?: string;

  @AllowNull
  @Column(DataType.STRING)
  public phone?: string;

  // Indica se il giocatore è libero
  @AllowNull
  @Column(DataType.BOOLEAN)
  public available?: boolean;

  // Giocatore 1 : Chi esegue la prenotazione
  // Player 1
  @ForeignKey(() => Player)
  @Column(DataType.INTEGER)
  public player1Id?: number;
  @BelongsTo(() => Player, 'player1Id')
  public player1?: Player;

  // Giocatore 2
  // Player 2
  @ForeignKey(() => Player)
  @Column(DataType.INTEGER)
  public player2Id?: number;
  @BelongsTo(() => Player, 'player2Id')
  public player2?: Player;
}
