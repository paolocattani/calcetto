import {
  Column,
  CreatedAt,
  DeletedAt,
  Model,
  Table,
  UpdatedAt,
  HasMany,
  DataType,
  Default
} from 'sequelize-typescript';
import Pair from './pair.model';
import s1Matrix from './s1Matrix.model';
import { TournamentProgress } from './types';

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
  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.INTEGER)
  //@ForeignKey(() => User)
  public ownerId!: number;

  @Default('New')
  @Column(DataType.ENUM('New', 'PairsSelection', 'Stage1', 'Stage2'))
  @Column(DataType.STRING)
  public progress!: TournamentProgress;

  @Column(DataType.BOOLEAN)
  public public!: boolean;

  // Virtual columns
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

  @HasMany(() => s1Matrix)
  public s1Matrix!: s1Matrix[];

  // TODO:
  //@HasOne(() => User)
  //owner!: User;
}
