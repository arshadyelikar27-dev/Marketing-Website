/// <reference types="vite/client" />

declare module '@tanstack/react-router' {
  export * from '@tanstack/react-router/dist/esm/index';
}

declare module '*.gen' {
  const content: any;
  export default content;
}
