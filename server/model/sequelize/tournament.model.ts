import { Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt, HasMany, DataType } from 'sequelize-typescript';
import Pair from './pair.model';
import s1Matrix from './s1Matrix.model';

/**
 * Rapprenta un Torneo :
 *  - I gironi vengono assegnati dinamicamente in base a quelli assegnati in fase di formazione delle coppuie
 *  - Stessa cosa per ordinamento automatico
 *  - Le coppie vengono definite qui. Prevedere possibilità di aggiungere coppie
 */
@Table({ tableName: 'tournament', version: false })
export default class Tournament extends Model<Tournament> {
  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.INTEGER)
  //@ForeignKey(() => User)
  public ownerId!: number;

  //@Column(DataType.ENUM)
  //public progress!: ["stage1", "stage2"];
  @Column(DataType.STRING)
  public progress!: string;

  @Column(DataType.BOOLEAN)
  public public!: boolean;

  @HasMany(() => Pair)
  public pairs!: Pair[];

  @HasMany(() => s1Matrix)
  public s1Matrix!: s1Matrix[];

  // TODO:
  //@HasOne(() => User)
  //owner!: User;
}
