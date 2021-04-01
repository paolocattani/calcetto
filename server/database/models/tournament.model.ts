import {
	Column,
	Model,
	Table,
	Comment,
	HasMany,
	DataType,
	Default,
	AllowNull,
	ForeignKey,
	BelongsTo,
} from 'sequelize-typescript';
import { Pair, Stage1, Stage2, User } from '.';
import { TournamentProgress } from '@common/dto';

/**
 * Rapprenta un Torneo :
 * @name string nome del torneo
 * @ownerId number riferimento al proprietario
 * @progress string stato avanzamento
 * @public boolean visibile ad altri utenti
 * @autoOrder attiva/disattiva ordinamento automatico su Stage1
 * @pairs Pairs[] coppie associate a questo torneo
 * @Stage1 Stage1[] stage1
 *
 */
@Table({ tableName: 'tournament', modelName: 'Tournament', freezeTableName: true, version: false })
export default class Tournament extends Model {
	@Comment('Nome')
	@Column(DataType.STRING)
	public name!: string;

	@Comment('Data')
	@Column(DataType.DATE)
	public date!: Date;

	@Comment('State')
	@Default(TournamentProgress.New)
	@Column(DataType.ENUM({ values: Object.values(TournamentProgress) }))
	public progress!: TournamentProgress;

	@Comment('Visibile ad utenti non loggati')
	@Column(DataType.BOOLEAN)
	public public!: boolean;

	@Comment('Ordinamento automatico')
	@Default(false)
	@Column(DataType.BOOLEAN)
	public autoOrder!: boolean;

	// Virtual columns
	@Comment('Label')
	@Column({
		type: DataType.VIRTUAL,
		get(this: Tournament): string {
			return `${this.name} @ ${this.progress}`;
		},
	})
	public label!: string;

	// Model Associations
	@HasMany(() => Pair)
	public pairs!: Pair[];

	@HasMany(() => Stage1)
	public Stage1!: Stage1[];

	@HasMany(() => Stage2)
	public Stage2!: Stage2[];

	// Associazione utente
	@AllowNull
	@Comment('Id Owner')
	@ForeignKey(() => User)
	@Column(DataType.INTEGER)
	public ownerId?: number;
	@BelongsTo(() => User, 'ownerId')
	public owner?: User;
}
