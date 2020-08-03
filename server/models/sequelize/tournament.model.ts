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
import Pair from './pair.model';
import Stage1 from './stage1.model';
import Stage2 from './stage2.model';
import User from './user.model';
import { TournamentProgress } from '../dto/tournament.dto';

/**
 * Rapprenta un Torneo :
 * @name string nome del torneo
 * @ownerId number riferimento al proprietario ( TODO: )
 * @progress string stato avanzamento
 * @public boolean visibile ad utenti non loggati ( TODO: )
 * @pairs Pairs[] coppie associate a questo torneo
 * @Stage1 Stage1[] stage1
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
  @Column(
    DataType.ENUM(
      TournamentProgress.New,
      TournamentProgress.PairsSelection,
      TournamentProgress.Stage1,
      TournamentProgress.Stage2
    )
  )
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
