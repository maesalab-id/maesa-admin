import { Identifier, useListContext } from '@maesa-admin/core';
import { Button, Menu, MenuItem, MenuLabel, MenuProps } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconX, IconTrash } from '@tabler/icons';
import { ListHelper } from './types';

export const BulkDeleteButton = (props: BulkDeleteButtonProps): JSX.Element => {
  const { menuProps, onSubmit } = props;
  const { selectedIds, refetch } = useListContext();
  const listHelper = {
    refetch,
  };
  const handleSubmit = async () => {
    try {
      await onSubmit(selectedIds, listHelper);
      showNotification({
        title: 'Deleting',
        message: 'Successfully delete items',
        color: 'green',
        icon: <IconCheck />,
      });
    } catch (err: any) {
      console.error(err.message);
      showNotification({
        title: 'Error while deleting',
        message: err.message,
        icon: <IconX />,
        color: 'red',
      });
    }
  };
  return (
    <>
      <Menu
        title="Delete"
        size="sm"
        {...menuProps}
        control={
          <Button
            variant="subtle"
            color="red"
            leftIcon={<IconTrash size={14} />}
          >
            Delete All
          </Button>
        }
      >
        <MenuLabel>Are your sure?</MenuLabel>
        <MenuItem
          color={'red'}
          onClick={handleSubmit}
          icon={<IconTrash size={16} />}
        >
          Just delete it
        </MenuItem>
        <MenuItem icon={<IconTrash color="transparent" size={16} />}>
          Not now
        </MenuItem>
      </Menu>
    </>
  );
};

export interface BulkDeleteButtonProps {
  menuProps?: MenuProps;
  onSubmit: (ids: Identifier[], listHelper: ListHelper) => void;
}
