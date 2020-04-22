import React, { lazy } from 'react';

// import { OrganizationChartDemo } from '../Stage2/table';
const lazyPlayer = lazy(() => import('../../Player/table'));
const lazyTournament = lazy(() => import('../../Tournament/select'));
const lazyPairs = lazy(() => import('../../Pair/table'));
const lazyStage1 = lazy(() => import('../../Stage1/wrapper'));
const lazyStage2 = lazy(() => import('../../Stage2/table'));
const lazyLogin = lazy(() => import('../../Auth/Wrapper'));
const lazyUser = lazy(() => import('../../Auth/Edit'));
const lazyRedirectionControl = lazy(() =>
  import('../generic/Commons').then((module) => ({ default: module.RedirectionControl }))
);

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
    index: 0,
  },
  {
    path: '/',
    label: 'Home',
    exact: true,
    ComponentToRender: lazyTournament,
    visible: false,
    private: true,
    index: 10,
  },
  {
    path: '/tournament/:tId',
    label: 'Selezione Coppie',
    exact: true,
    ComponentToRender: lazyPairs,
    visible: false,
    private: true,
    index: 20,
  },
  {
    path: '/stage1/:tId',
    label: 'Torneo fase 1',
    exact: true,
    ComponentToRender: lazyStage1,
    visible: false,
    private: true,
    index: 30,
  },
  {
    path: '/player',
    label: 'Gestione Giocatori',
    exact: true,
    ComponentToRender: lazyPlayer,
    visible: true,
    private: true,
    index: 40,
  },
  {
    path: '/user',
    label: 'Gestione Utente',
    exact: true,
    ComponentToRender: lazyUser,
    visible: false,
    private: true,
    index: 50,
  },
  {
    path: '/stage2/:tId',
    label: 'Torneo fase 2',
    exact: true,
    ComponentToRender: lazyStage2 as any,
    //ComponentToRender: OrganizationChartDemo,
    visible: !(process.env.NODE_ENV === 'production'),
    private: true,
    index: 100,
  },
  // TODO: creare pagina per route not found
  {
    path: '*',
    label: 'Not Found',
    exact: false,
    ComponentToRender: lazyRedirectionControl,
    visible: false,
    private: true,
    index: 1000,
  },
];
export default routes;

export function getLabelByPathname(pathName: string): string {
  const element = routes.find((e) => e.path === pathName);
  return element ? element.label : `route ${pathName} not found!`;
}

export function getRouteByPathname(pathName: string): routeType | undefined {
  return routes.find((e) => e.path === pathName);
}
