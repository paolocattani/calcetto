import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  DataType,
  AutoIncrement
} from 'sequelize-typescript';
import { IntegerDataType, BigIntDataType, FloatDataType, ENUM } from 'sequelize';

@Table({ tableName: 'player', version: true })
export default class Player extends Model<Player> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name?: string;

  @Column(DataType.STRING)
  surname?: string;

  @Column(DataType.STRING)
  alias?: string;

  //@Column(DataType.ENUM)
  //role!: ["striker", "goalkeeper", "both"];
  @Column(DataType.STRING)
  role!: string;

  @Column(DataType.BIGINT)
  match_played!: number;

  @Column(DataType.BIGINT)
  match_won!: number;

  @Column(DataType.FLOAT)
  total_score!: number;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;

  @DeletedAt
  deletedAt?: Date;

  public toString() {
    return `[ ${this.id} , ${this.name} , ${this.surname} , ${this.alias} , ${this.role} , ${this.match_played} , , ${this.match_won} , ${this.total_score}]`;
  }
}
