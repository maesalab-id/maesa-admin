import { ReactNode } from 'react';
import { ChoicesContext } from './ChoicesContext';

export const ChoicesContextProvider = ({
  value,
  children,
}: {
  value: any;
  children: ReactNode;
}) => (
  <ChoicesContext.Provider value={value}>{children}</ChoicesContext.Provider>
);
