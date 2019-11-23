
import { AutoIncrement, Column, CreatedAt, DeletedAt, Model, PrimaryKey, Table, UpdatedAt, ForeignKey, HasMany, HasOne } from 'sequelize-typescript';
import { IntegerDataType} from 'sequelize/types';
import Pair from './pair.model'
import Tournament from './tournament.model';

/**
 * https://stackoverflow.com/questions/2142566/storing-matrices-in-a-relational-database
 * 
 * Rapprenta un Elemento(Coppia) all'interno del Girone :
 *  - questa struttare dovrebbe permettermi di aggiungere coppie dinamicamente senza problemi.
 */
@Table
export default class s1Element extends Model<s1Element> {
 
    @Column
    @AutoIncrement
    @PrimaryKey
    id!: IntegerDataType;
    
    @Column
    @ForeignKey(()=> Tournament)
    tournamentId!:IntegerDataType

    // Coppia
    @Column
    @ForeignKey(()=> Pair)
    pairId!: IntegerDataType;
    
    // Punteggio totale per la coppia
    // Potrebbe essere calcolato tramite trigger
    @Column
    score!:IntegerDataType

    // Posizionamento della coppia all'interno del girone.
    // Potrebbe essere calcolato progressivamente con un trigger. Da valutare
    @Column
    placement!:IntegerDataType

    @CreatedAt
    createdAt?: Date;

    @UpdatedAt  
    updatedAt?: Date;
    
    @DeletedAt  
    deletedAt?: Date;

    @HasOne(()=> Pair)
    pair!:Pair;
}