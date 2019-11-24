import { Column, CreatedAt, DeletedAt, Model, PrimaryKey, Table, UpdatedAt, HasMany, DataType } from 'sequelize-typescript';
import Pair from './pair.model'
import { IntegerDataTypeConstructor } from 'sequelize/types';

/**
 * Rapprenta un Torneo :
 *  - Il numero di gironi da creare verrà solo chiesto in fase di creazione , non server salvarlo
 *  - Stessa cosa per ordinamento automatico
 *  - Le coppie vengono definite qui. Prevedere possibilità di aggiungere coppie
 */
@Table({ tableName: 'tournament' })
export default class Tournament extends Model<Tournament> {

    @PrimaryKey
    @Column(DataType.INTEGER)
    public id!: IntegerDataTypeConstructor;

    @Column(DataType.STRING)
    public name!: string;

    @Column(DataType.INTEGER)
    //@ForeignKey(() => User)
    public ownerId!: IntegerDataTypeConstructor;

    @Column(DataType.ENUM)
    public progress!: ["stage1", "stage2"];

    @Column(DataType.BOOLEAN)
    public public!: boolean

    @CreatedAt
    public createdAt?: Date;

    @UpdatedAt
    public updatedAt?: Date;

    @DeletedAt
    public deletedAt?: Date;

    @HasMany(() => Pair)
    public pairs!: Pair[];

    //@HasOne(() => User)
    //owner!: User;
}