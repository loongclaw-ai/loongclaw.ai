import type { DocSection } from '../../../types';

export const docsStructure: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    path: '/docs',
    description: 'Quick start guide for LoongClaw',
    children: [
      {
        id: 'installation',
        title: 'Installation',
        path: '/docs/installation',
        description: 'Install LoongClaw on your system',
      },
      {
        id: 'quickstart',
        title: 'Quick Start',
        path: '/docs/quickstart',
        description: 'Run your first model in 5 minutes',
      },
    ],
  },
  {
    id: 'guides',
    title: 'Guides',
    path: '/docs/guides',
    description: 'Detailed usage guides',
    children: [
      {
        id: 'model-management',
        title: 'Model Management',
        path: '/docs/guides/model-management',
        description: 'Pull, list, and remove models',
      },
      {
        id: 'configuration',
        title: 'Configuration',
        path: '/docs/guides/configuration',
        description: 'Customize LoongClaw settings',
      },
    ],
  },
  {
    id: 'api',
    title: 'API Reference',
    path: '/docs/api',
    description: 'REST API documentation',
    children: [
      {
        id: 'generate',
        title: 'Generate',
        path: '/docs/api/generate',
        description: 'Generate completions',
      },
      {
        id: 'chat',
        title: 'Chat',
        path: '/docs/api/chat',
        description: 'Chat completions API',
      },
    ],
  },
];

export default docsStructure;
