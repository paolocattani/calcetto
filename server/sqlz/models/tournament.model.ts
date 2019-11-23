import { AutoIncrement, Column, CreatedAt, DeletedAt, Model, PrimaryKey, Table, UpdatedAt, ForeignKey, HasMany, HasOne } from 'sequelize-typescript';
import { IntegerDataType, DataTypes, BigIntDataType, FloatDataType, ENUM } from 'sequelize/types';
import Pair from './pair.model'
import User from './User.model';


/**
 * Rapprenta un Torneo :
 *  - Il numero di gironi da creare verrà solo chiesto in fase di creazione , non server salvarlo
 *  - Stessa cosa per ordinamento automatico
 *  - Le coppie vengono definite qui. Prevedere possibilità di aggiungere coppie
 */
@Table
export default class Tournament extends Model<Tournament> {
 
    @Column
    @AutoIncrement
    @PrimaryKey
    id!: IntegerDataType;
    
    @Column
    name!: string;

    @Column
    @ForeignKey(()=>User)
    ownerId!: IntegerDataType;
    
    @Column({type : ENUM})
    progress!: ["stage1" , "stage2" ];

    @Column
    public!:boolean

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt  
    updatedAt?: Date;
    
    @DeletedAt  
    deletedAt?: Date;

    @HasMany(() => Pair)
    pairs!: Pair[];

    @HasOne(()=> User)
    owner!:User;
}