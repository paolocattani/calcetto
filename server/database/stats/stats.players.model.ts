import { Column, Model, Table, DataType, ForeignKey, HasOne } from 'sequelize-typescript';
import Player from '../player.model';

/**
 *
 */
@Table({ tableName: 'stats_player', freezeTableName: true, version: false })
export default class StatsPlayers extends Model {
	@ForeignKey(() => Player)
	@Column(DataType.INTEGER)
	public readonly playerId!: number;
	@HasOne(() => Player, 'playerId')
	public readonly player!: Player;

	@Column(DataType.INTEGER)
	public readonly s1Win!: number;
	@Column(DataType.INTEGER)
	public readonly s1Def!: number;
	@Column(DataType.INTEGER)
	public readonly s2Win!: number;
	@Column(DataType.INTEGER)
	public readonly s2Def!: number;
	@Column(DataType.INTEGER)
	public readonly totWin!: number;
	@Column(DataType.INTEGER)
	public readonly totDef!: number;
	@Column(DataType.INTEGER)
	public readonly totRatio!: number;
}
