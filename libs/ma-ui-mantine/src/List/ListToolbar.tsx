import { Box, Group } from '@mantine/core';
import { FC, ReactElement } from 'react';
import { FilterButton, FilterForm } from '../Table';

export const ListToolbar: FC<ListToolbarProps> = (props) => {
  const { filters, actions } = props;

  return (
    <Group mb="md">
      <FilterForm filters={filters} />
      <FilterButton filters={filters} />
      <Box sx={{ flexGrow: 1 }} />
      {actions}
    </Group>
  );
};

export interface ListToolbarProps {
  filters?: ReactElement[];
  actions?: ReactElement | null;
}
