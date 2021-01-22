import { Column, Model, Table, DataType, ForeignKey, BelongsTo, DefaultScope } from 'sequelize-typescript';
import Player from '../player.model';

/**
 *
 */
@DefaultScope(() => ({
	include: [StatsPairs.associations.player1, StatsPairs.associations.player2],
}))
@Table({ tableName: 'stats_pairs', freezeTableName: true, version: false, timestamps: false })
export default class StatsPairs extends Model {
	@ForeignKey(() => Player)
	@Column(DataType.INTEGER)
	public player1Id!: number;
	@BelongsTo(() => Player, 'player1Id')
	public player1!: Player;

	@ForeignKey(() => Player)
	@Column(DataType.INTEGER)
	public player2Id!: number;
	@BelongsTo(() => Player, 'player2Id')
	public player2!: Player;

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
