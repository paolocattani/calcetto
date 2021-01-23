import { Model, Column, DataType } from 'sequelize-typescript';
import { StatsPairs, StatsPlayer } from '..';

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
		type: DataType.VIRTUAL,
		get(this: StatsPairs | StatsPlayer): number {
			return this.totwin + this.totdef;
		},
	})
	public totMatch!: number;
	@Column({
		type: DataType.VIRTUAL,
		get(this: StatsPairs | StatsPlayer): number {
			return this.s1win + this.s1def;
		},
	})
	public totS1!: number;
	@Column({
		type: DataType.VIRTUAL,
		get(this: StatsPairs | StatsPlayer): number {
			return this.s2win + this.s2def;
		},
	})
	public totS2!: number;
	@Column({
		type: DataType.VIRTUAL,
		get(this: StatsPairs | StatsPlayer): number {
			return ((this.s1win + this.s2win) * 100) / +this.totMatch;
		},
	})
	public winPercentage!: number;
	@Column({
		type: DataType.VIRTUAL,
		get(this: StatsPairs | StatsPlayer): number {
			return (this.s1win * 100) / +this.totS1;
		},
	})
	public winS1Percentage!: number;
	@Column({
		type: DataType.VIRTUAL,
		get(this: StatsPairs | StatsPlayer): number {
			return (this.s2win * 100) / +this.totS2;
		},
	})
	public winS2Percentage!: number;

	@Column({
		type: DataType.VIRTUAL,
		get(this: StatsPairs | StatsPlayer): number {
			return ((this.s1def + this.s2def) * 100) / +this.totMatch;
		},
	})
	public defPercentage!: number;
	@Column({
		type: DataType.VIRTUAL,
		get(this: StatsPairs | StatsPlayer): number {
			return (this.s1def * 100) / +this.totS1;
		},
	})
	public defS1Percentage!: number;
	@Column({
		type: DataType.VIRTUAL,
		get(this: StatsPairs | StatsPlayer): number {
			return (this.s2def * 100) / +this.totS2;
		},
	})
	public defS2Percentage!: number;
}
