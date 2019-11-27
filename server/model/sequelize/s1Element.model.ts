
import { AutoIncrement, Column, CreatedAt, DeletedAt, Model, PrimaryKey, Table, UpdatedAt, ForeignKey, HasMany, HasOne, DataType } from 'sequelize-typescript';
import { IntegerDataType } from 'sequelize';
import Pair from './pair.model'
import Tournament from './tournament.model';

/**
 * https://stackoverflow.com/questions/2142566/storing-matrices-in-a-relational-database
 * 
 * Rapprenta un Elemento(Coppia) all'interno del Girone :
 *  - questa struttare dovrebbe permettermi di aggiungere coppie dinamicamente senza problemi.
 */
@Table({ tableName: 's1element' })
export default class s1Element extends Model<s1Element> {

    @PrimaryKey
    @Column(DataType.INTEGER)
    id!: IntegerDataType;

    @Column(DataType.INTEGER)
    @ForeignKey(() => Tournament)
    tournamentId!: IntegerDataType

    // Coppia
    @Column(DataType.INTEGER)
    @ForeignKey(() => Pair)
    pairId!: IntegerDataType;

    // Punteggio totale per la coppia
    // Potrebbe essere calcolato tramite trigger
    //@Column(DataType.ENUM)
    //score!: [0, 1, 2, 3];
    @Column(DataType.INTEGER)
    score!: IntegerDataType;

    // Posizionamento della coppia all'interno del girone.
    // Potrebbe essere calcolato progressivamente con un trigger. Da valutare
    @Column(DataType.INTEGER)
    placement!: IntegerDataType

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt
    updatedAt?: Date;

    @DeletedAt
    deletedAt?: Date;

    @HasOne(() => Pair, 'pairId')
    pair!: Pair;

    @HasOne(() => Tournament, 'tournamentId')
    tournament!: Tournament;
}