// Models/Types
import { PlayerDTO, PlayerRole } from '../models/dto/player.dto';
import Player from '../models/sequelize/player.model';
// Logger utils
import { logProcess } from '../core/logger';

// Const
const className = 'Player Manager : ';

export const listAllInTournament = async (tId: number): Promise<PlayerDTO[]> => {
  try {
    logProcess(className + 'listAllInTournament', 'start');
    const users = await Player.findAll({
      order: [
        ['alias', 'DESC'],
        ['name', 'DESC'],
        ['surname', 'DESC'],
      ],
      include: [Player.associations.pair1, Player.associations.pair2],
    });
    logProcess(className + 'listAllInTournament', 'users fetched');

    const result = users
      .filter((player) => {
        // Se il giocatore non ha alias o nome lo escludo in quanto non sarebbe identificabile nella selezione delle coppie
        if (player.alias === '' && player.name === '') return false;
        // Se non è ancora stato assegnato a nessuno coppia allora è disponibile
        if (!player.pair1 && !player.pair2) return true;
        /*
         * Se il giocatore è gia stato assegnato ad una coppia ( in posizione 1 o 2 )
         * che appartiene al torneo che sto analizzando allora lo devo escludere
         * perchè non è piu tra quelli selezionabili
         */
        if (
          (player.pair1 && player.pair1.find((e) => e.tournamentId === tId)) ||
          (player.pair2 && player.pair2.find((e) => e.tournamentId === tId))
        )
          return false;
        else return true;
      })
      // Rimappo per escludere le associazioni
      .map((player) => convertEntityToDTO(player));
    logProcess(className + 'listAllInTournament', 'end');
    return result;
  } catch (error) {
    logProcess(className + 'listAllInTournament', ` Error : ${error}`);
    return [];
  }
};

export const listAll = async (): Promise<PlayerDTO[]> => {
  try {
    logProcess(className + 'listAll', 'start');
    const users = await Player.findAll({
      order: [['id', 'ASC']],
      include: [Player.associations.pair1, Player.associations.pair2],
    });
    logProcess(className + 'listAll', 'end');
    return users.map((player) => convertEntityToDTO(player));
  } catch (error) {
    logProcess(className + 'listAll', ` Error : ${error}`);
    return [];
  }
};

export const create = async (model: any): Promise<Player | null> => {
  let player: Player | null = null;
  try {
    logProcess(className + 'create', 'start');
    if (model.id === 0) model.id = null;
    if (model.id) player = await Player.findOne({ where: { id: model.id } });
    if (player) {
      player.update(model);
      logProcess(className + 'create', `updated => ${player.toString()}`);
    } else {
      player = await Player.create(model);
      logProcess(className + 'create', `created => ${player.toString()}`);
    }
  } catch (error) {
    logProcess(className + 'create', ` Errror : ${error}`);
  }
  logProcess(className + 'create', 'end');
  return player;
};

export const deletePlayer = async (models: Player[]): Promise<number> =>
  await Player.destroy({ where: { id: models.map((e) => e.id) } });

// Utils
export const parseBody = (body: any) =>
  ({
    id: body.id,
    name: body.name || '',
    surname: body.surname || '',
    alias: body.alias || '',
    role: body.role || PlayerRole.Striker,
    email: body.email || '',
    phone: body.phone || '',
    match_played: body.match_played || 0,
    match_won: body.match_won || 0,
    total_score: body.total_score || 0,
  } as Player);

/**
 * Converte l'entity in un DTO da passare al FE.
 *
 * TODO: in futuro sarebbe meglio gestire un DTO per ogni entity per disaccopiare
 * i dati tra FE e BE
 *
 * @param player  Player entity
 */
export const convertEntityToDTO = (player: Player): PlayerDTO => ({
  id: player.id,
  name: player.name,
  surname: player.surname,
  alias: player.alias,
  label: player.label,
  email: player.email || '',
  phone: player.phone || '',
  role: player.role,
  match_played: player.match_played || 0,
  match_won: player.match_won || 0,
  total_score: player.total_score || 0,
  editable: player.editable,
});
