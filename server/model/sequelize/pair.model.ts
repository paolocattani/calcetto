import { AutoIncrement, Column, CreatedAt, DeletedAt, Model, PrimaryKey, Table, UpdatedAt, ForeignKey, BelongsTo, HasMany, HasOne, DataType } from 'sequelize-typescript';
import { IntegerDataType } from 'sequelize';
import Tournament from './tournament.model'
import Player from './player.model'

@Table({ tableName: 'pairs' })
export default class Pair extends Model<Pair> {

    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: IntegerDataType;

    // Tournament id
    @Column(DataType.INTEGER)
    @ForeignKey(() => Tournament)
    tournamentId?: IntegerDataType;

    // First Player id
    @Column(DataType.INTEGER)
    @ForeignKey(() => Player)
    first_playerId?: IntegerDataType;

    // Secondo Player id
    @Column(DataType.INTEGER)
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

    @HasOne(() => Player, 'first_playerId')
    first_player!: Player

    @HasOne(() => Player, 'second_playerId')
    second_player!: Player

}