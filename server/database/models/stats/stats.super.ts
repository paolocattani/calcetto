import { Model, Column, DataType } from 'sequelize-typescript';
import { StatsPairs, StatsPlayer } from '..';
import { logger } from '../../../core/logger';

export default class StatsGeneric extends Model {
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

	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return Number(this.totwin) + Number(this.totdef);
		},
	})
	public readonly totMatch!: number;
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return Number(this.s1win) + Number(this.s1def);
		},
	})
	public readonly totS1!: number;
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return Number(this.s2win) + Number(this.s2def);
		},
	})
	public readonly totS2!: number;
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return ((Number(this.s1win) + Number(this.s2win)) * 100) / this.totMatch;
		},
	})
	public readonly winPercentage!: number;
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return (this.s1win * 100) / this.totS1;
		},
	})
	public readonly winS1Percentage!: number;
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return (this.s2win * 100) / this.totS2;
		},
	})
	public readonly winS2Percentage!: number;

	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return ((Number(this.s1def) + Number(this.s2def)) * 100) / this.totMatch;
		},
	})
	public readonly defPercentage!: number;
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer) {
			return (this.s1def * 100) / this.totS1;
		},
	})
	public readonly defS1Percentage!: number;
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return (this.s2def * 100) / this.totS2;
		},
	})
	public readonly defS2Percentage!: number;
}
