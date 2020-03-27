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
  BelongsTo
} from 'sequelize-typescript';
import Pair from './pair.model';
import s1Matrix from './s1Matrix.model';
import { TournamentProgress } from './types';
import User from './user.model';

/**
 * Rapprenta un Torneo :
 * @name string nome del torneo
 * @ownerId number riferimento al proprietario ( TODO: )
 * @progress string stato avanzamento
 * @public boolean visibile ad utenti non loggati ( TODO: )
 * @pairs Pairs[] coppie associate a questo torneo
 * @s1Matrix s1Matrix[] stage1
 *
 */
@Table({ tableName: 'tournament', freezeTableName: true, version: false })
export default class Tournament extends Model<Tournament> {
  @Comment('Nome')
  @Column(DataType.STRING)
  public name!: string;

  @Comment('Data')
  @Column(DataType.DATE)
  public date!: Date;

  @Comment('Stato')
  @Default('New')
  @Column(DataType.ENUM('New', 'PairsSelection', 'Stage1', 'Stage2'))
  public progress!: TournamentProgress;

  @Comment('Visibile ad utenti non loggati')
  @Column(DataType.BOOLEAN)
  public public!: boolean;

  // Virtual columns
  @Comment('Label')
  @Column({
    type: DataType.VIRTUAL,
    get(this: Tournament): string {
      return `${this.name} @ ${this.progress}`;
    }
  })
  public label!: string;

  // Model Associations
  @HasMany(() => Pair)
  public pairs!: Pair[];

  // FIXME: rimuove questa associazione, lasciarla solo lato s1Matrix
  @HasMany(() => s1Matrix)
  public s1Matrix!: s1Matrix[];

  // Associazione utente
  @AllowNull
  @Comment('Id Owner')
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public ownerId?: number;
  @BelongsTo(() => User, 'ownerId')
  public owner?: User;
}
