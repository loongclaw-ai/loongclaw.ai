import { renderToString } from "react-dom/server";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import i18n from "./app/i18n";
import { appRoutes } from "./app/routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { getSeoForPath } from "./seo/metadata";

export async function render(pathname: string) {
  await i18n.changeLanguage("en");

  const router = createMemoryRouter(appRoutes, {
    initialEntries: [pathname],
  });

  const appHtml = renderToString(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );

  const seo = getSeoForPath(pathname, i18n.t.bind(i18n), i18n.language);

  return { appHtml, seo };
}
