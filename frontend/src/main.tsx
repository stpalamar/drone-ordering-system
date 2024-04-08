import '~/assets/css/styles.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './app/app.js';

createRoot(document.querySelector('#root') as HTMLElement).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
