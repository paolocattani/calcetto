import { AutoIncrement, Column, CreatedAt, DeletedAt, Model, PrimaryKey, Table, UpdatedAt, ForeignKey, HasMany, HasOne } from 'sequelize-typescript';
import { IntegerDataType} from 'sequelize/types';
import Pair from './pair.model'

/**
 * Rapprenta un Coppia all'interno del Girone :
 *  - questa struttare dovrebbe permettermi di aggiungere coppie dinamicamente senza problemi.
 */
@Table
export default class Stage1 extends Model<Stage1> {
 
    @Column
    @AutoIncrement
    @PrimaryKey
    id!: IntegerDataType;
    
    @Column
    name!: string;

    @Column
    @ForeignKey(()=> Pair)
    pairId!: IntegerDataType;
    
    // Punteggio totale per la coppia
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