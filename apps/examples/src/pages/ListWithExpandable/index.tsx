import { Box } from '@mantine/core';
import { DataContext } from '../../api/DataContext';
import { useData } from '../../api/useData';
import { Layout } from './Layout';

export const ListWithExpandeble = () => {
  return (
    <DataContext.Provider value={useData()}>
      <Box mt="sm" px="sm">
        <Layout />
      </Box>
    </DataContext.Provider>
  );
};
