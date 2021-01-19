import { PlayerDTO } from '../player.dto';
import { Stats } from './stats.dto';

export interface StatsPlayerDTO extends Stats {
	player: PlayerDTO;
}
