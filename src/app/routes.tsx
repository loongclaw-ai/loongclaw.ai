import type { RouteObject } from "react-router-dom";
import { Outlet } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "../features/home";
import DocsPage from "../features/docs";
import CommunityPage from "../features/community";
import ChangelogPage from "../features/changelog";
import FileRedirectPage from "../features/system/FileRedirectPage";
import NotFoundPage from "../features/system/NotFoundPage";
import RouteErrorPage from "../features/system/RouteErrorPage";

export const PageLayout = () => (
  <RootLayout>
    <Outlet />
  </RootLayout>
);

export const appRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "sitemap",
        element: (
          <FileRedirectPage
            title="Sitemap | Loong"
            description="Redirecting to the XML sitemap."
            target="/sitemap.xml"
          />
        ),
      },
      {
        path: "robots",
        element: (
          <FileRedirectPage
            title="robots.txt | Loong"
            description="Redirecting to the robots.txt file."
            target="/robots.txt"
          />
        ),
      },
      {
        path: "docs",
        element: <DocsPage />,
      },
      {
        path: "docs/*",
        element: <DocsPage />,
      },
      {
        path: "community",
        element: <CommunityPage />,
      },
      {
        path: "changelog",
        element: <ChangelogPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
];
