import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import Pair from './pair.model';

@Table({ tableName: 'player', freezeTableName: true, version: false })
export default class Player extends Model<Player> {
  @Column(DataType.STRING)
  public name?: string;

  @Column(DataType.STRING)
  public surname?: string;

  @Column(DataType.STRING)
  public alias?: string;

  //@Column(DataType.ENUM)
  //role!: ["striker", "goalkeeper", "both"];
  @Column(DataType.STRING)
  public role!: string;

  @Column(DataType.BIGINT)
  public match_played!: number;

  @Column(DataType.BIGINT)
  public match_won!: number;

  @Column(DataType.FLOAT)
  public total_score!: number;

  // Models association
  @HasMany(() => Pair, 'player1Id')
  public pair1!: Pair[];

  @HasMany(() => Pair, 'player2Id')
  public pair2!: Pair[];

  public toString() {
    return `[ id=${this.id} , name=${this.name} , surname=${this.surname} , alias=${this.alias} , role=${this.role} , match_played=${this.match_played} ,  match_won=${this.match_won} , total_score=${this.total_score}]`;
  }
}
