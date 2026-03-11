import { useState, useEffect } from "react";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function useHeadings(contentRef: React.RefObject<HTMLElement>) {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    if (!contentRef.current) return;

    const elements = contentRef.current.querySelectorAll("h2, h3");
    const extractedHeadings: Heading[] = [];

    elements.forEach((el, index) => {
      // Generate ID if not present
      if (!el.id) {
        el.id = `heading-${index}`;
      }

      extractedHeadings.push({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      });
    });

    setHeadings(extractedHeadings);
  }, [contentRef]);

  return headings;
}
