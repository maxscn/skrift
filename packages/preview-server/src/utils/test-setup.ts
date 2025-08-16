import { GlobalRegistrator } from '@happy-dom/global-registrator';

// Register happy-dom globally for DOM APIs
GlobalRegistrator.register();

// Add cleanup
export const setupDOM = () => {
  // DOM is already registered globally
};

export const cleanupDOM = () => {
  // Reset document
  if (typeof document !== 'undefined') {
    document.body.innerHTML = '';
  }
};