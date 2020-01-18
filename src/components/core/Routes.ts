import FTournament from '../FTournament';
import PlayerTable from '../Player/table';
import Pairs from '../Pair/table';
// TODO:
import * as Todo from '../DELETE/Todo';

type routeType = {
  path: string;
  label: string;
  exact: boolean;
  component: any;
  visible: boolean;
  index: number;
};

// Mappatura route
export const routes: routeType[] = [
  { path: '/', label: 'Home', exact: true, component: FTournament, visible: true, index: 0 },
  {
    path: '/tournament/:id',
    label: 'Selezione Coppie',
    exact: true,
    component: Pairs,
    visible: true,
    index: 10
  },

  {
    path: '/player',
    label: 'Gestione Giocatori',
    exact: true,
    component: PlayerTable,
    visible: true,
    index: 90
  },

  // TODO: creare pagina per route not found
  { path: '*', label: 'Not Found', exact: false, component: Todo.RedirectionControl, visible: false, index: 1000 }
];
export default routes;

export function getLabelByPathname(pathName: string): string {
  const element = routes.find(e => e.path === pathName);
  return element ? element.label : `route ${pathName} not found!`;
}

export function getRouteByPathname(pathName: string): routeType | undefined {
  return routes.find(e => e.path === pathName);
}
