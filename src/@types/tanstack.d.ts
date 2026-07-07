declare module '@tanstack/react-router' {
  import type { ComponentType, ReactNode } from 'react';

  export interface RouteOptions {
    component?: ComponentType<any>;
    head?: () => {
      meta?: Record<string, any>[];
      links?: Record<string, any>[];
    };
  }

  export function createRootRoute(options?: RouteOptions): Route;
  export function createFileRoute(path: string): {
    (options: RouteOptions): Route;
  };

  export class Route {
    constructor(options?: any);
  }

  export function createRouter(options: {
    routeTree: any;
    defaultPreload?: string;
    scrollRestoration?: boolean;
  }): Router;

  export class Router {
    constructor(options: any);
    load(): Promise<void>;
    state: any;
  }

  export function RouterProvider(props: { router: Router }): JSX.Element;
  export function Outlet(): JSX.Element;
  export function HeadContent(): JSX.Element;
  export function Scripts(): JSX.Element;
  export function Link(props: any): JSX.Element;
}

declare module './routeTree.gen' {
  export const routeTree: any;
}
