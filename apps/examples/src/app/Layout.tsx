import { Stack } from '@mantine/core';
import { Router } from './Router';
import { Sidebar } from './Sidebar';

export const Layout = () => {
  return (
    <>
      <Sidebar />
      <Stack
        sx={{
          marginLeft: 300,
          flexGrow: 1,
        }}
      >
        <Router />
      </Stack>
    </>
  );
};
