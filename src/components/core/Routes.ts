import FTournament from '../FTournament';
import PlayerTable from '../Player/table';
import Pairs from '../Pair/table';
import Stage1Table from '../Stage1/table';

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
    path: '/tournament/:tId',
    label: 'Selezione Coppie',
    exact: true,
    component: Pairs,
    visible: false,
    index: 10
  },
  {
    path: '/stage1/:tId',
    label: 'Torneo fase 1',
    exact: true,
    component: Stage1Table,
    visible: false,
    index: 20
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
