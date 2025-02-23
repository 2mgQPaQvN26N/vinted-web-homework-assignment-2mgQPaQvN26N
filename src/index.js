import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';

// eslint-disable-next-line no-undef
const domNode = document.getElementById('root');
const root = createRoot(domNode);

root.render(<App />);