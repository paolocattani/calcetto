import {
	Column,
	Model,
	Comment,
	Table,
	ForeignKey,
	DataType,
	BelongsTo,
	AfterSave,
	AfterUpdate,
	AfterBulkDestroy,
} from 'sequelize-typescript';
import Pair from './pair.model';
import Tournament from './tournament.model';
import { sendNotificationToAll } from '../events/events';
import { SessionStatus } from '../../src/@common/models';

/**
 * https://stackoverflow.com/questions/2142566/storing-matrices-in-a-relational-database
 *
 * Rapprenta un Coppia all'interno del Girone :
 *
 * - Posizionamento all'interno del girone
 *  Select row_number,idCoppia from matrice
 *      where idTorneo=? order by idTorneo, score desc
 *
 */
@Table({ tableName: 'stage1', freezeTableName: true, version: false })
export default class Stage1 extends Model<Stage1> {
	@Column(DataType.STRING)
	name!: string;

	// Models association
	// Tournament
	@ForeignKey(() => Tournament)
	@Column(DataType.INTEGER)
	public tournamentId?: number;
	@BelongsTo(() => Tournament)
	public tournament!: Tournament;

	@Comment('Pair 1')
	@ForeignKey(() => Pair)
	@Column(DataType.INTEGER)
	public pair1Id!: number;
	@BelongsTo(() => Pair, 'pair1Id')
	public pair1!: Pair;

	@Comment('Pair 2')
	@ForeignKey(() => Pair)
	@Column(DataType.INTEGER)
	public pair2Id!: number;
	@BelongsTo(() => Pair, 'pair2Id')
	public pair2!: Pair;

	// Punteggio totale pe r la coppia
	@Comment('Score of pair1 vs pair2')
	@Column(DataType.INTEGER)
	public score?: number;

	// Posizionamento della coppia all'interno del girone.
	@Column(DataType.INTEGER)
	public placement!: number;

	@AfterUpdate
	static notifyUpdate(entity: Stage1) {
		const message = { status: SessionStatus.STAGE1_UPDATE, label:'common:notification.updating' };
		sendNotificationToAll(message, entity.tournamentId);
	}

}
