import Tournament from '../Tournament/Tournament';
import PlayerTable from '../Player/table';
import Pairs from '../Pair/table';
import Stage1Wrapper from '../Stage1/wrapper';
import Stage2 from '../Stage2/model';
import { RedirectionControl } from './RedirectionControls';
import Login from '../Auth/Wrapper';
// import { OrganizationChartDemo } from '../Stage2/table';

export interface routeType {
  path: string;
  label: string;
  exact: boolean;
  ComponentToRender: React.ComponentType;
  visible: boolean;
  index: number;
  private: boolean;
}

// Mappatura route
export const routes: routeType[] = [
  { path: '/login', label: 'Login', exact: true, ComponentToRender: Login, visible: false, private: false, index: 0 },
  { path: '/', label: 'Home', exact: true, ComponentToRender: Tournament, visible: false, private: true, index: 10 },
  {
    path: '/tournament/:tId',
    label: 'Selezione Coppie',
    exact: true,
    ComponentToRender: Pairs,
    visible: false,
    private: false,
    index: 20
  },
  {
    path: '/stage1/:tId',
    label: 'Torneo fase 1',
    exact: true,
    ComponentToRender: Stage1Wrapper,
    visible: false,
    private: true,
    index: 30
  },

  {
    path: '/player',
    label: 'Gestione Giocatori',
    exact: true,
    ComponentToRender: PlayerTable,
    visible: true,
    private: true,
    index: 40
  },
  {
    path: '/stage2/:tId',
    label: 'Torneo fase 2',
    exact: true,
    ComponentToRender: Stage2,
    //ComponentToRender: OrganizationChartDemo,
    visible: !(process.env.NODE_ENV === 'production'),
    private: true,
    index: 50
  },
  // TODO: creare pagina per route not found
  {
    path: '*',
    label: 'Not Found',
    exact: false,
    ComponentToRender: RedirectionControl,
    visible: false,
    private: true,
    index: 1000
  }
];
export default routes;

export function getLabelByPathname(pathName: string): string {
  const element = routes.find(e => e.path === pathName);
  return element ? element.label : `route ${pathName} not found!`;
}

export function getRouteByPathname(pathName: string): routeType | undefined {
  return routes.find(e => e.path === pathName);
}
