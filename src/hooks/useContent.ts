import { useEffect, useRef, useReducer } from "react";
import { loadDocContent, loadChangelogContent } from "../utils/content-loader";

interface ContentState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

type ContentAction<T> =
  | { type: "reset" }
  | { type: "loading" }
  | { type: "success"; payload: T }
  | { type: "error"; payload: Error };

function contentReducer<T>(
  state: ContentState<T>,
  action: ContentAction<T>,
): ContentState<T> {
  switch (action.type) {
    case "reset":
      return { data: null, loading: false, error: null };
    case "loading":
      return { ...state, loading: true, error: null };
    case "success":
      return { data: action.payload, loading: false, error: null };
    case "error":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function useDocContent(
  contentPath: string | null,
): ContentState<{ html: string; title: string; description?: string }> {
  const [state, dispatch] = useReducer(
    contentReducer<{ html: string; title: string; description?: string }>,
    { data: null, loading: false, error: null },
  );
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (contentPath === previousPath.current) {
      return;
    }
    previousPath.current = contentPath;

    if (!contentPath) {
      dispatch({ type: "reset" });
      return;
    }

    dispatch({ type: "loading" });

    loadDocContent(contentPath)
      .then((data) => dispatch({ type: "success", payload: data }))
      .catch((err) => dispatch({ type: "error", payload: err }));
  }, [contentPath]);

  return state;
}

export function useChangelogContent(
  contentPath: string | null,
): ContentState<{ html: string; version: string; date: string }> {
  const [state, dispatch] = useReducer(
    contentReducer<{ html: string; version: string; date: string }>,
    { data: null, loading: false, error: null },
  );
  const previousPath = useRef<string | null>(null);

  useEffect(() => {
    if (contentPath === previousPath.current) {
      return;
    }
    previousPath.current = contentPath;

    if (!contentPath) {
      dispatch({ type: "reset" });
      return;
    }

    dispatch({ type: "loading" });

    loadChangelogContent(contentPath)
      .then((data) => dispatch({ type: "success", payload: data }))
      .catch((err) => dispatch({ type: "error", payload: err }));
  }, [contentPath]);

  return state;
}
