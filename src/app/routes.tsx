import type { RouteObject } from "react-router-dom";
import { Outlet, useLocation, useNavigationType } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import HomePage from "../features/home";
import DocsPage from "../features/docs";
import CommunityPage from "../features/community";
import ChangelogPage from "../features/changelog";
import FileRedirectPage from "../features/system/FileRedirectPage";
import NotFoundPage from "../features/system/NotFoundPage";
import RouteErrorPage from "../features/system/RouteErrorPage";

export const PageLayout = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const isDocsRoute = location.pathname.startsWith("/docs");
  const transitionClass = isDocsRoute
    ? "page-transition-shell page-transition-shell-static"
    : `page-transition-shell ${navigationType === "POP" ? "page-transition-shell-pop" : "page-transition-shell-push"}`;

  return (
    <RootLayout>
      <div key={isDocsRoute ? "docs-shell" : location.pathname} className={transitionClass}>
        <Outlet />
      </div>
    </RootLayout>
  );
};

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
