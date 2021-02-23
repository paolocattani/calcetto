import { Column, Model, Table, DataType, Unique } from 'sequelize-typescript';

/**
 *
 */

@Table({ tableName: 'config', modelName: 'Config', freezeTableName: true, version: false })
export default class Config extends Model {
	@Column(DataType.STRING)
	public configSet!: string;

	@Unique
	@Column(DataType.STRING)
	public key!: string;

	@Column(DataType.STRING)
	public value?: string;

	@Column(DataType.STRING)
	public notes?: string;
}
