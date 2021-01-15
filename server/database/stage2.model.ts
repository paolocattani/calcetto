import { Column, Model, Table, Comment, DataType, ForeignKey, AllowNull, BelongsTo } from 'sequelize-typescript';
import Tournament from './tournament.model';
import Pair from './pair.model';

/**
 *
 */
@Table({ tableName: 'stage2', comment: 'Stage2', freezeTableName: true, version: false })
export default class Stage2 extends Model {
	@Comment('Id Torneo')
	@ForeignKey(() => Tournament)
	@Column(DataType.INTEGER)
	public tournamentId!: number;
	@BelongsTo(() => Tournament)
	public tournament!: Tournament;

	@Comment('Id Coppia')
	@ForeignKey(() => Pair)
	@Column(DataType.INTEGER)
	public pairId!: number;
	@BelongsTo(() => Pair, 'pairId')
	public pair!: Pair;

	@Comment('Step')
	@Column(DataType.INTEGER)
	public step!: number;

	@Comment('Order')
	@Column(DataType.INTEGER)
	public order!: number;

	@AllowNull
	@Comment('Rank')
	@Column(DataType.INTEGER)
	public rank?: number;
}
