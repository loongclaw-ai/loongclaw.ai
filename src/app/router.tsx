// src/app/router.tsx
import { createBrowserRouter, Outlet } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Footer from '../components/layout/Footer';
import HomePage from '../features/home';
import DocsPage from '../features/docs';
import CommunityPage from '../features/community';
import ChangelogPage from '../features/changelog';

// Layout wrapper with RootLayout and Footer
const PageLayout = () => (
  <RootLayout>
    <main style={{ flex: 1, position: 'relative', zIndex: 1 }}>
      <Outlet />
    </main>
    <Footer />
  </RootLayout>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'docs',
        element: <DocsPage />,
      },
      {
        path: 'docs/*',
        element: <DocsPage />,
      },
      {
        path: 'community',
        element: <CommunityPage />,
      },
      {
        path: 'changelog',
        element: <ChangelogPage />,
      },
    ],
  },
]);

export default router;
