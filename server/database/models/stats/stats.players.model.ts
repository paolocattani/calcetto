import { Column, Table, DataType, ForeignKey, BelongsTo, DefaultScope } from 'sequelize-typescript';
import Player from '../player.model';
import StatsGeneric from './stats.super';

/**
 *
 */
@DefaultScope(() => ({
	include: [Player],
}))
@Table({ tableName: 'stats_players', freezeTableName: true, version: false, timestamps: false })
export default class StatsPlayers extends StatsGeneric {
	@ForeignKey(() => Player)
	@Column(DataType.INTEGER)
	public playerid!: number;
	@BelongsTo(() => Player, 'playerid')
	public player!: Player;
}
