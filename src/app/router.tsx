// src/app/router.tsx
import { createBrowserRouter, Outlet } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import NavBar from '../components/layout/NavBar';

// Placeholder components for features not yet implemented
const PlaceholderPage = ({ name }: { name: string }) => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>{name}</h1>
    <p>This page is coming soon.</p>
  </div>
);

const HomePage = () => <PlaceholderPage name="Home" />;
const DocsPage = () => <PlaceholderPage name="Documentation" />;
const CommunityPage = () => <PlaceholderPage name="Community" />;
const ChangelogPage = () => <PlaceholderPage name="Changelog" />;

// Simple footer component
const Footer = () => (
  <footer style={{ padding: '1rem', textAlign: 'center', borderTop: '1px solid #ccc' }}>
    <p>&copy; {new Date().getFullYear()} OpenClaw. All rights reserved.</p>
  </footer>
);

// Layout wrapper with NavBar and Footer
const PageLayout = () => (
  <RootLayout>
    <NavBar />
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
