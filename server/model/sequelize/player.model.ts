import { Column, CreatedAt, DeletedAt, Model, PrimaryKey, Table, UpdatedAt, DataType, AutoIncrement } from 'sequelize-typescript';
import { IntegerDataType, BigIntDataType, FloatDataType, ENUM } from 'sequelize';

@Table({ tableName: 'player' })
export default class Player extends Model<Player> {

    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: IntegerDataType;

    @Column(DataType.STRING)
    name?: string;

    @Column(DataType.STRING)
    surname?: string;

    @Column(DataType.STRING)
    alias?: string;

    //@Column(DataType.ENUM)
    //role!: ["striker", "goalkeeper", "both"];
    @Column(DataType.STRING)
    role!: string;

    @Column(DataType.BIGINT)
    match_played!: BigIntDataType;

    @Column(DataType.BIGINT)
    match_won!: BigIntDataType;

    @Column(DataType.FLOAT)
    total_score!: FloatDataType;

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @DeletedAt
    deletedAt?: Date;

}