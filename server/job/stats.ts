import { logger } from '@core/logger';

export default async (active: boolean) => {
	if (!active) {
		return;
	}
	logger.info('Activating jobs...');

	logger.info('Activation done');
};
