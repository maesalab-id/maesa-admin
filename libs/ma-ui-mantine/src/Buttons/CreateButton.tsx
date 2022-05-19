import { Button, Drawer } from '@mantine/core';
import { IconPlus } from '@tabler/icons';
import { ReactElement, useState } from 'react';
import { CreateForm } from './CreateForm';

export const CreateButton = (props: CreateButtonProps): JSX.Element => {
  const { fields, onSubmit } = props;
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button
        leftIcon={<IconPlus size={14} />}
        onClick={() => setOpen((o) => !o)}
      >
        Create
      </Button>
      <Drawer
        title="Create"
        padding={'xl'}
        size="xl"
        opened={isOpen}
        onClose={() => setOpen(false)}
      >
        <CreateForm fields={fields} onSubmit={onSubmit} />
      </Drawer>
    </>
  );
};

export interface CreateButtonProps {
  fields: ReactElement[];
  onSubmit: (values: any) => void;
}
