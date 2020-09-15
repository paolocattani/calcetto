import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  Default,
  AllowNull,
  Comment,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Pair from './pair.model';
import User from './user.model';
import { PlayerRole } from '../../src/@common/dto';

@Table({ tableName: 'player', freezeTableName: true, version: false })
export default class Player extends Model<Player> {
  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.STRING)
  public surname!: string;

  @Column(DataType.STRING)
  public alias!: string;

  @Default(PlayerRole.GoalKeeper)
  @Column(DataType.ENUM(PlayerRole.GoalKeeper, PlayerRole.Striker, PlayerRole.Master))
  public role!: PlayerRole;

  @Column(DataType.STRING)
  public email?: string;

  @Column(DataType.STRING)
  public phone?: string;

  @Default(0)
  @Column(DataType.BIGINT)
  public match_played!: number;

  @Default(0)
  @Column(DataType.BIGINT)
  public match_won!: number;

  @Default(0)
  @Column(DataType.FLOAT)
  public total_score!: number;

  // Associazione utente
  @AllowNull
  @Comment('User')
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public userId?: number;
  @BelongsTo(() => User, 'userId')
  public user?: User;

  // Virtual Columns
  @Column({
    type: DataType.VIRTUAL,
    get(this: Player): boolean {
      if (this.pair1 && this.pair1.length > 0) return false;
      if (this.pair2 && this.pair2.length > 0) return false;
      else return true;
    },
  })
  public editable!: boolean;

  @Column({
    type: DataType.VIRTUAL,
    get(this: Player): string {
      return this.alias ? this.alias : `${this.name} ${this.surname}`;
    },
  })
  public label!: string;

  // Models association
  @HasMany(() => Pair, 'player1Id')
  public pair1?: Pair[];

  @HasMany(() => Pair, 'player2Id')
  public pair2?: Pair[];

  // Instance Methods
  public toString() {
    return `[ id=${this.id} , name=${this.name} , surname=${this.surname} , alias=${this.alias} , role=${this.role} , match_played=${this.match_played} ,  match_won=${this.match_won} , total_score=${this.total_score}]`;
  }
}
