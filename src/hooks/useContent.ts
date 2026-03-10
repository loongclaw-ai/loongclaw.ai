import { useState, useEffect } from "react";
import { loadDocContent, loadChangelogContent } from "../utils/content-loader";

interface UseContentResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useDocContent(
  contentPath: string | null,
): UseContentResult<{ html: string; title: string; description?: string }> {
  const [data, setData] = useState<{
    html: string;
    title: string;
    description?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!contentPath) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    loadDocContent(contentPath)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [contentPath]);

  return { data, loading, error };
}

export function useChangelogContent(
  contentPath: string | null,
): UseContentResult<{ html: string; version: string; date: string }> {
  const [data, setData] = useState<{
    html: string;
    version: string;
    date: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!contentPath) {
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);

    loadChangelogContent(contentPath)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [contentPath]);

  return { data, loading, error };
}
