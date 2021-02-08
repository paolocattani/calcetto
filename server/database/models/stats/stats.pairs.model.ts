import { Column, Table, DataType, ForeignKey, BelongsTo, DefaultScope } from 'sequelize-typescript';
import Player from '../player.model';
import StatsGeneric from './stats.super';

/**
 *
 */
@DefaultScope(() => ({
	include: [StatsPairs.associations.player1, StatsPairs.associations.player2],
}))
@Table({ tableName: 'stats_pairs', freezeTableName: true, version: false, timestamps: false })
export default class StatsPairs extends StatsGeneric {
	@ForeignKey(() => Player)
	@Column(DataType.INTEGER)
	public player1id!: number;
	@BelongsTo(() => Player, 'player1id')
	public player1!: Player;

	@ForeignKey(() => Player)
	@Column(DataType.INTEGER)
	public player2id!: number;
	@BelongsTo(() => Player, 'player2id')
	public player2!: Player;
}
