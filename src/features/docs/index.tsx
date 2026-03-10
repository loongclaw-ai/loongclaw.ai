import type { FC } from 'react';
import DocsSidebar from './components/DocsSidebar';
import DocContent from './components/DocContent';

const DocsPage: FC = () => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <DocsSidebar />
      <main
        style={{
          flex: 1,
          padding: '3rem 4rem 6rem 4rem',
          overflowY: 'auto',
        }}
      >
        <DocContent />
      </main>
    </div>
  );
};

export default DocsPage;
