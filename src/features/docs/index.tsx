import type { FC } from 'react';
import DocsSidebar from './components/DocsSidebar';
import DocContent from './components/DocContent';
import docsStructure from './data/docs-structure';

const DocsPage: FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)' }}>
      <DocsSidebar sections={docsStructure} />
      <main
        style={{
          marginLeft: '280px',
          padding: '3rem 4rem',
          flex: 1,
        }}
      >
        <DocContent />
      </main>
    </div>
  );
};

export default DocsPage;
