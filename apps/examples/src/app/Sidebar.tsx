import {
  Group,
  Navbar,
  Stack,
  Code,
  createStyles,
  Avatar,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';

const links = [
  {
    label: 'List',
    path: '/list',
  },
  {
    label: 'List with Custom Form',
    path: '/list-custom-form',
  },
  {
    label: 'List with Expandable',
    path: '/list-with-expandable',
  },
  {
    label: 'Empty',
    path: '/',
  },
];

export const Sidebar = () => {
  const { classes, cx } = useStyles();
  return (
    <Navbar
      p="md"
      width={{ sm: 300 }}
      sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <Avatar />
          <Code>v0.0.5</Code>
        </Group>
      </Navbar.Section>
      <Navbar.Section grow={true} className={classes.menu}>
        <Stack>
          {links.map(({ label, path }) => (
            <NavLink key={path} to={path} className={classes.link}>
              {label}
            </NavLink>
          ))}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

const useStyles = createStyles((theme) => ({
  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    marginBottom: theme.spacing.lg,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors['dark'][4] : theme.colors['gray'][3]
    }`,
  },

  menu: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  link: {
    boxSizing: 'border-box',
    display: 'block',
    textDecoration: 'none',
    borderTopRightRadius: theme.radius.md,
    borderBottomRightRadius: theme.radius.md,
    color:
      theme.colorScheme === 'dark'
        ? theme.colors['dark'][0]
        : theme.colors['gray'][7],
    padding: `0 ${theme.spacing.md}px`,
    fontSize: theme.fontSizes.sm,
    marginRight: theme.spacing.md,
    fontWeight: 500,
    height: 44,
    lineHeight: '44px',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors['dark'][5]
          : theme.colors['gray'][1],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },

    '&.active, &:hover': {
      borderLeftColor:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
      backgroundColor:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
      color: theme.white,
    },
  },
}));
