import {
  Column,
  Model,
  Table,
  Comment,
  DataType,
  Default,
  ForeignKey,
  BelongsTo,
  HasOne,
  IsNull,
  AllowNull
} from 'sequelize-typescript';
import { UserRole } from './types';
import Player from './player.model';
import Pair from './pair.model';

/**
 * Rapprensenta un Utente :
 * @name string nome del torneo
 * @surname string nome del torneo
 * @email string nome del torneo
 * @birthday string nome del torneo
 * @password string
 * @name string nome del torneo
 *
 */
@Table({ tableName: 'user', freezeTableName: true, version: false })
export default class User extends Model<User> {
  @AllowNull
  @Column(DataType.STRING)
  public name!: string;

  @AllowNull
  @Column(DataType.STRING)
  public surname!: string;

  @Column(DataType.STRING)
  public password!: string;

  @Column(DataType.STRING)
  public email!: string;

  @AllowNull
  @Column(DataType.DATE)
  public birthday?: Date;

  @Default('User')
  @Column(DataType.ENUM('User', 'Admin'))
  public role!: UserRole;

  // Associazione giocatore
  @AllowNull
  @Comment('Player')
  @ForeignKey(() => Player)
  @Column(DataType.INTEGER)
  public playerId?: number;
  @HasOne(() => Player, 'playerId')
  public player?: Player;
}
