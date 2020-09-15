import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Player from './player.model';
import { User } from '.';

/**
 * Gestione prenotazione
 */
@Table({ tableName: 'reservation', freezeTableName: true, version: false })
export default class Reservation extends Model<Reservation> {
  // Data prenotazione
  @Column(DataType.DATE)
  public reservationDate!: Date;

  // Data torneo
  @Column(DataType.DATE)
  public tournamentDate!: Date;

  // Chi ha effettuato la prenotazione
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public userId?: number;
  @BelongsTo(() => User, 'userId')
  public user?: User;

  /*
    Potrebbe essere che una persona X esegue la prenotazione
    per altri due giocatori, ed entrambi potrebbero essere nuovi.
  */
  // Giocatore 1
  @ForeignKey(() => Player)
  @Column(DataType.INTEGER)
  public player1Id?: number;
  @BelongsTo(() => Player, 'player1Id')
  public player1?: Player;
  @Column(DataType.BOOLEAN)
  public player1Accepted?: boolean;
  @Column(DataType.BOOLEAN)
  public player1Available?: boolean;
  @Column(DataType.STRING)
  public player1Name?: string;
  @Column(DataType.STRING)
  public player1Surname?: string;
  @Column(DataType.STRING)
  public player1Phone?: string;
  @Column(DataType.STRING)
  public player1Email?: string;

  // Giocatore 2
  @ForeignKey(() => Player)
  @Column(DataType.INTEGER)
  public player2Id?: number;
  @BelongsTo(() => Player, 'player2Id')
  public player2?: Player;
  @Column(DataType.BOOLEAN)
  public player2Accepted?: boolean;
  @Column(DataType.BOOLEAN)
  public player2Available?: boolean;
  @Column(DataType.STRING)
  public player2Name?: string;
  @Column(DataType.STRING)
  public player2Surname?: string;
  @Column(DataType.STRING)
  public player2Phone?: string;
  @Column(DataType.STRING)
  public player2Email?: string;
}
