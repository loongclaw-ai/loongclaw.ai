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
          padding: '4rem 5rem 8rem',
          overflowY: 'auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <DocContent />
      </main>
    </div>
  );
};

export default DocsPage;
