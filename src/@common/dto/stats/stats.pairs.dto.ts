import { PlayerDTO } from '../player.dto';
import { Stats } from './stats.dto';

export interface StatsPairDTO extends Stats {
	player1: PlayerDTO;
	player2: PlayerDTO;
}
