import { AutoIncrement, Column, CreatedAt, DeletedAt, Model, PrimaryKey, Table, UpdatedAt, ForeignKey, HasMany, HasOne } from 'sequelize-typescript';
import { IntegerDataType} from 'sequelize/types';
import Pair from './pair.model'
import Tournament from './tournament.model';

/**
 * https://stackoverflow.com/questions/2142566/storing-matrices-in-a-relational-database
 * 
 * Rapprenta un Coppia all'interno del Girone :
 *  - questa struttare dovrebbe permettermi di aggiungere coppie dinamicamente senza problemi.
 *  
 * - Totale coppia
 *  Select sum(score) from matrice 
 *      where idCoppia=? and idTorneo=? group by idTorneo,idCoppia
 * 
 * - Posizionamento all'interno del girone
 *  Select row_number,idCoppia from matrice 
 *      where idTorneo=? order by idTorneo, score desc
 * 
 */
@Table
export default class s1Matrix extends Model<s1Matrix> {

    @Column
    @AutoIncrement
    @PrimaryKey
    id!: IntegerDataType;
    
    @Column
    name!: string;

    @Column
    @ForeignKey(()=> Tournament)
    tournamentId!:IntegerDataType
    
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