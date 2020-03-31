import React from 'react';

// import { OrganizationChartDemo } from '../Stage2/table';
const lazyPlayer = React.lazy(() => import('../Player/table'));
const lazyTournament = React.lazy(() => import('../Tournament/Tournament'));
const lazyPairs = React.lazy(() => import('../Pair/table'));
const lazyStage1 = React.lazy(() => import('../Stage1/wrapper'));
const lazyStage2 = React.lazy(() => import('../Stage2/model'));
const lazyRedirectionControl = React.lazy(() => import('./RedirectionControls'));
const lazyLogin = React.lazy(() => import('../Auth/Wrapper'));

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
  {
    path: '/login',
    label: 'Login',
    exact: true,
    ComponentToRender: lazyLogin,
    visible: false,
    private: false,
    index: 0
  },
  {
    path: '/',
    label: 'Home',
    exact: true,
    ComponentToRender: lazyTournament,
    visible: false,
    private: true,
    index: 10
  },
  {
    path: '/tournament/:tId',
    label: 'Selezione Coppie',
    exact: true,
    ComponentToRender: lazyPairs,
    visible: false,
    private: true,
    index: 20
  },
  {
    path: '/stage1/:tId',
    label: 'Torneo fase 1',
    exact: true,
    ComponentToRender: lazyStage1,
    visible: false,
    private: true,
    index: 30
  },

  {
    path: '/player',
    label: 'Gestione Giocatori',
    exact: true,
    ComponentToRender: lazyPlayer,
    visible: true,
    private: true,
    index: 40
  },
  {
    path: '/stage2/:tId',
    label: 'Torneo fase 2',
    exact: true,
    ComponentToRender: lazyStage2,
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
    ComponentToRender: lazyRedirectionControl,
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
