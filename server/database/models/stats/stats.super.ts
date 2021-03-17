import { Model, Column, DataType } from 'sequelize-typescript';
import { StatsPairs, StatsPlayer } from '..';
import { roundNumber } from '@common/utils/math.utils';

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

	// Totals
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

	// Ratio
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return Number(this.s1def) == 0 ? 1 : roundNumber(Number(this.s1win) / Number(this.s1def), 2);
		},
	})
	public readonly ratioS1!: number;

	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return Number(this.s2def) == 0 ? 1 : roundNumber(Number(this.s2win) / Number(this.s2def), 2);
		},
	})
	public readonly ratioS2!: number;

	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return Number(this.totdef) == 0 ? 1 : roundNumber(Number(this.totwin) / Number(this.totdef), 2);
		},
	})
	public readonly ratioTot!: number;

	// Winnings
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return Number(this.totMatch) == 0
				? 100
				: roundNumber(((Number(this.s1win) + Number(this.s2win)) * 100) / this.totMatch, 2);
		},
	})
	public readonly winPercentage!: number;
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return Number(this.totS1) == 0 ? 100 : roundNumber((this.s1win * 100) / this.totS1, 2);
		},
	})
	public readonly winS1Percentage!: number;
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return Number(this.totS2) == 0 ? 100 : roundNumber((this.s2win * 100) / this.totS2, 2);
		},
	})
	public readonly winS2Percentage!: number;

	// Defeats
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return Number(this.totMatch) == 0
				? 100
				: roundNumber(((Number(this.s1def) + Number(this.s2def)) * 100) / this.totMatch, 2);
		},
	})
	public readonly defPercentage!: number;
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer) {
			return Number(this.totS1) == 0 ? 100 : roundNumber((this.s1def * 100) / this.totS1, 2);
		},
	})
	public readonly defS1Percentage!: number;
	@Column({
		type: DataType.VIRTUAL(DataType.NUMBER),
		get(this: StatsPairs | StatsPlayer): number {
			return Number(this.totS2) == 0 ? 100 : roundNumber((this.s2def * 100) / this.totS2, 2);
		},
	})
	public readonly defS2Percentage!: number;
}
