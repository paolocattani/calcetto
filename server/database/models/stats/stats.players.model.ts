import { Column, Model, Table, DataType, ForeignKey, BelongsTo, DefaultScope } from 'sequelize-typescript';
import Player from '../player.model';

/**
 *
 */
@DefaultScope(() => ({
	include: [Player],
}))
@Table({ tableName: 'stats_player', freezeTableName: true, version: false, timestamps: false })
export default class StatsPlayers extends Model {
	@ForeignKey(() => Player)
	@Column(DataType.INTEGER)
	public readonly playerId!: number;
	@BelongsTo(() => Player, 'playerId')
	public readonly player!: Player;

	@Column(DataType.INTEGER)
	public readonly s1win!: number;
	@Column(DataType.INTEGER)
	public readonly s1def!: number;
	@Column(DataType.INTEGER)
	public readonly s2win!: number;
	@Column(DataType.INTEGER)
	public readonly s2def!: number;
	@Column(DataType.INTEGER)
	public readonly totwin!: number;
	@Column(DataType.INTEGER)
	public readonly totdef!: number;
	@Column(DataType.INTEGER)
	public readonly ratiotot!: number;
}
