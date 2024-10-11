import { setupWorker } from 'msw/browser';

import { handlers } from '@/mocks/handlers';

const worker = setupWorker(...handlers);

export async function enableMocking() {
  if (import.meta.env.MODE !== 'development') {
    return;
  }
  return worker.start();
}
