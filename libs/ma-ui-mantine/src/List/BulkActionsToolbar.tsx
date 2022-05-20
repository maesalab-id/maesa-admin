import { Identifier } from '@maesa-admin/core';
import {
  Button,
  Collapse,
  createStyles,
  Group,
  Text,
  ThemeIcon,
} from '@mantine/core';
import { IconCheck, IconChecks } from '@tabler/icons';
import { ReactNode } from 'react';

export const BulkActionsToolbar = (props: BulkActionsToolbar): JSX.Element => {
  const { children, selectedIds = [] } = props;
  const { classes } = useStyles();
  return (
    <Collapse in={selectedIds.length > 0}>
      <Group className={classes.root}>
        <Group className={classes.toolbar}>
          <Group>
            <ThemeIcon size="sm" color={'gray'} variant="filled">
              <IconChecks size={20} />
            </ThemeIcon>
            <Text variant="text">{selectedIds.length} selected</Text>
          </Group>
        </Group>
        <div>{children}</div>
      </Group>
    </Collapse>
  );
};

export interface BulkActionsToolbar {
  selectedIds?: Identifier[];
  children?: ReactNode;
}

const useStyles = createStyles(({ spacing }) => ({
  root: {
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
  },
  toolbar: {
    flexGrow: 1,
    ['.collapsed']: {},
  },
}));
