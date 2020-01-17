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
  BelongsTo,
  HasOne,
  DataType
} from 'sequelize-typescript';
import { IntegerDataType } from 'sequelize';
import Tournament from './tournament.model';
import Player from './player.model';

@Table({ tableName: 'pairs', version: true })
export default class Pair extends Model<Pair> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  // Tournament id
  @Column(DataType.INTEGER)
  @ForeignKey(() => Tournament)
  tournamentId?: number;

  // First Player id
  @Column(DataType.INTEGER)
  @ForeignKey(() => Player)
  first_playerId?: number;

  // Secondo Player id
  @Column(DataType.INTEGER)
  @ForeignKey(() => Player)
  second_playerId?: number;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  // Model association
  @BelongsTo(() => Tournament)
  tournament!: Tournament;

  @HasOne(() => Player, 'first_playerId')
  first_player!: Player;

  @HasOne(() => Player, 'second_playerId')
  second_player!: Player;
}
