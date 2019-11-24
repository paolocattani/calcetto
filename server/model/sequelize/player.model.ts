import { AutoIncrement, Column, CreatedAt, DeletedAt, Model, PrimaryKey, Table, UpdatedAt } from 'sequelize-typescript';
import { IntegerDataType, DataTypes, BigIntDataType, FloatDataType, ENUM } from 'sequelize';

@Table
export default class Player extends Model<Player> {

    @Column
    @AutoIncrement
    @PrimaryKey
    id!: IntegerDataType;

    @Column
    name?: string;

    @Column
    surname?: string;

    @Column
    alias?: string;

    @Column({ type: ENUM })
    role!: ["striker", "goalkeeper", "both"];

    @Column
    match_played!: BigIntDataType;

    @Column
    match_won!: BigIntDataType;

    @Column
    total_score!: FloatDataType;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @DeletedAt
    deletedAt?: Date;

}