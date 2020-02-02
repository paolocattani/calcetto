import { Column, CreatedAt, DeletedAt, Model, Table, UpdatedAt, HasMany, DataType } from 'sequelize-typescript';
import Pair from './pair.model';

/**
 * Rapprenta un Torneo :
 *  - Il numero di gironi da creare verrà solo chiesto in fase di creazione , non server salvarlo
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

  //@HasOne(() => User)
  //owner!: User;
}
