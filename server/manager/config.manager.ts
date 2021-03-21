import { logProcess } from '@core/logger';
import Config from '../database/models/config.model';

type ConfigSetType = keyof typeof ConfigManager.config;
type KeysType = keyof typeof ConfigManager.keys;

export class ConfigManager {
	private static readonly className = 'ConfigManager';
	static readonly config = { BASE: 'BASE' };
	static readonly keys = {
		MAX_ATTEMPS_PER_MINUTE: 'MAX_ATTEMPS_PER_MINUTE',
		MAX_ATTEMPS_PER_DAY: 'MAX_ATTEMPS_PER_DAY',
	};

	static findByKey = async (key: KeysType) => {
		let config = null;
		logProcess(`${ConfigManager.className}.findByKey`, 'start');
		try {
			config = await Config.findOne({ where: { key } });
			logProcess(`${ConfigManager.className}.findByKey`, 'end');
		} catch (error) {
			logProcess(`${ConfigManager.className}.findByKey`, 'error', error);
			return null;
		}
		return config;
	};

	static addConfig = (key: KeysType, value: string, notes: string, config?: ConfigSetType) =>
		Config.create({ config, key, value, notes });

	static removeConfig = (key: KeysType, config: ConfigSetType = 'BASE') => Config.destroy({ where: { config, key } });
}
