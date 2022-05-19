import { createContext } from 'react';
import { UseDataResults } from './useData';

export const DataContext = createContext<UseDataResults>([
  {},
  {
    create() {
      /* no-op */
    },
    patch() {
      /* no-op */
    },
    update() {
      /* no-op */
    },
    remove() {
      /* no-op */
    },
  },
]);
