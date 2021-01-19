import { Column, Model, Table, DataType, ForeignKey, HasOne } from 'sequelize-typescript';
import Player from '../player.model';

/**
 *
 */
@Table({ tableName: 'stats_pairs', freezeTableName: true, version: false })
export default class StatsPairs extends Model {
	@ForeignKey(() => Player)
	@Column(DataType.INTEGER)
	public readonly player1Id: number;
	@HasOne(() => Player, 'player1Id')
	public readonly player1: Player;

	@ForeignKey(() => Player)
	@Column(DataType.INTEGER)
	public readonly player2Id: number;
	@HasOne(() => Player, 'player2Id')
	public readonly player2: Player;

	@Column(DataType.INTEGER)
	public readonly s1Win: number;
	@Column(DataType.INTEGER)
	public readonly s1Def: number;
	@Column(DataType.INTEGER)
	public readonly s2Win: number;
	@Column(DataType.INTEGER)
	public readonly s2Def: number;
	@Column(DataType.INTEGER)
	public readonly totWin: number;
	@Column(DataType.INTEGER)
	public readonly totDef: number;
	@Column(DataType.INTEGER)
	public readonly totRatio: number;
}
