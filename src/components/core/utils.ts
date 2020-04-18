import { TournamentProgress } from '../Tournament/type';

export const getTodayDate = () => formatDate(new Date());

export function translateTournamentProgress(value: string) {
  switch (value) {
    case TournamentProgress.New:
      return 'Nuovo';
    case TournamentProgress.PairsSelection:
      return 'Selezione Coppie';
    case TournamentProgress.Stage1:
      return 'Fase 1';
    case TournamentProgress.Stage2:
      return 'Fase 2';
    default:
      return '';
  }
}

export function formatDate(date: Date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
}

export function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}

export const phoneRegExp = new RegExp('^d{10}$');
export const passwordRegExp = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,16})');
export const emailRegExp = new RegExp(
  // eslint-disable-next-line quotes
  "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
);

export function getBaseLog(x: number, y: number) {
  return Math.log(y) / Math.log(x);
}
