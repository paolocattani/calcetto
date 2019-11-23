import { AutoIncrement, Column, CreatedAt, DeletedAt, Model, PrimaryKey, Table, UpdatedAt, ForeignKey, BelongsTo, HasMany, HasOne } from 'sequelize-typescript';
import { IntegerDataType, DataTypes, BigIntDataType, FloatDataType, ENUM } from 'sequelize/types';
import Tournament from './tournament.model'
import Player from './player.model'

@Table
export default class Pair extends Model<Pair> {
 
    @Column
    @AutoIncrement
    @PrimaryKey
    id!: IntegerDataType;
    
    // Tournament id
    @Column
    @ForeignKey(() => Tournament)
    tournamentId?: IntegerDataType;

    // First Player id
    @Column
    @ForeignKey(() => Player)
    first_playerId?: IntegerDataType;

    // Secondo Player id
    @Column
    @ForeignKey(() => Player)
    second_playerId?: IntegerDataType;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt  
    updatedAt?: Date;
    
    @DeletedAt  
    deletedAt?: Date;

    // Model association
    @BelongsTo(() => Tournament)
    tournament!: Tournament;

    @HasOne(()=> Player , 'first_playerId')
    first_player!:Player

    @HasOne(()=> Player , 'second_playerId')
    second_player!:Player

}