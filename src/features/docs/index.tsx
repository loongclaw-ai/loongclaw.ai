import type { FC } from 'react';
import { useRef } from 'react';
import DocsSidebar from './components/DocsSidebar';
import DocContent from './components/DocContent';
import ReadingProgress from './components/ReadingProgress';
import BackToTop from './components/BackToTop';
import TableOfContents from './components/TableOfContents';
import { useHeadings } from './hooks/useHeadings';

const DocsPage: FC = () => {
  const contentRef = useRef<HTMLElement>(null);
  const headings = useHeadings(contentRef);

  return (
    <>
      <ReadingProgress />
      <div style={{ display: 'flex', height: '100%' }}>
        <DocsSidebar />
        <main
          style={{
            flex: 1,
            padding: '4rem 5rem 8rem',
            overflowY: 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <DocContent contentRef={contentRef} />
        </main>
        <TableOfContents items={headings} />
      </div>
      <BackToTop />
    </>
  );
};

export default DocsPage;
