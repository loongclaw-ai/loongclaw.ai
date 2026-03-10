// src/app/router.tsx
import { createBrowserRouter, Outlet } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from '../features/home';
import DocsPage from '../features/docs';
import CommunityPage from '../features/community';
import ChangelogPage from '../features/changelog';

// Layout wrapper with RootLayout
const PageLayout = () => (
  <RootLayout>
    <Outlet />
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
