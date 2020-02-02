import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import Pair from './pair.model';

@Table({ tableName: 'player', version: false })
export default class Player extends Model<Player> {
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

  @HasMany(() => Pair, 'player1Id')
  pair1!: Pair[];

  @HasMany(() => Pair, 'player2Id')
  pair2!: Pair[];

  /*
  public toString() {
    return `[ ${this.id} , ${this.name} , ${this.surname} , ${this.alias} , ${this.role} , ${this.match_played} , , ${this.match_won} , ${this.total_score}]`;
  }
  */
}
