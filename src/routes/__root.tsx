import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import '../styles.css';

const Grain = lazy(() => import('../components/velora/Grain'));

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Velora — Cinema for moments that matter' },
      {
        name: 'description',
        content:
          'Velora is a cinematic production studio specializing in weddings, events, business, and brand promotion.',
      },
      { property: 'og:title', content: 'Velora — Cinema for moments that matter' },
      {
        property: 'og:description',
        content:
          'Cinematic production for weddings, events, business & brand promotion.',
      },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'Velora — Cinema for moments that matter' },
      {
        name: 'twitter:description',
        content:
          'Cinematic production for weddings, events, business & brand promotion.',
      },
    ],
    links: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap',
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  return (
    <html lang="en" className="bg-near-black text-ivory antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="vignette">
        <Suspense fallback={null}>
          <Grain />
        </Suspense>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
