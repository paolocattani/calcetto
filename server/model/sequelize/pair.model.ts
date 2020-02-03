import { Column, Model, Table, ForeignKey, BelongsTo, BelongsToMany, HasOne } from 'sequelize-typescript';
import Tournament from './tournament.model';
import Player from './player.model';

@Table({ tableName: 'pairs', version: false })
export default class Pair extends Model<Pair> {
  @Column
  pairAlias?: string;

  @Column
  stage1Name?: string;

  @ForeignKey(() => Tournament)
  @Column
  tournamentId?: number;

  @ForeignKey(() => Player)
  @Column
  player1Id?: number;

  @ForeignKey(() => Player)
  @Column
  player2Id?: number;

  // Model association
  @BelongsTo(() => Tournament)
  tournament!: Tournament;

  @BelongsTo(() => Player, 'player1Id')
  player1?: Player;

  @BelongsTo(() => Player, 'player2Id')
  player2?: Player;

  public toString() {
    return `[ id=${this.id} , tId=${this.tournamentId} , player1=${this.player1?.name ??
      'Non impostato'} , player2=${this.player2?.name ?? 'Non impostato'} , alias=${this.pairAlias} , stage1Name=${
      this.stage1Name
    }]`;
  }
}
