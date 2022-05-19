import { Button, Drawer, DrawerProps } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconPlus, IconX } from '@tabler/icons';
import { FormikHelpers } from 'formik';
import { ReactElement, useState } from 'react';
import { CreateForm } from './CreateForm';

export const CreateButton = (props: CreateButtonProps): JSX.Element => {
  const { drawer, fields, onSubmit } = props;
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
        {...drawer}
        title="Create"
        padding={'xl'}
        size="xl"
        opened={isOpen}
        onClose={() => setOpen(false)}
      >
        {isOpen && (
          <CreateForm
            fields={fields}
            onSubmit={(values, helpers) => {
              const { setSubmitting, setErrors } = helpers;
              try {
                onSubmit(values, helpers);
                setOpen(false);
              } catch (err: any) {
                setErrors({
                  submit: err.message,
                });
                showNotification({
                  color: 'red',
                  icon: <IconX size={18} />,
                  title: 'Error while submitting',
                  message: err.message,
                });
                console.error(err.message);
              }
              setSubmitting(false);
            }}
          />
        )}
      </Drawer>
    </>
  );
};

export interface CreateButtonProps<T = { [key: string]: any }> {
  drawer?: DrawerProps;
  fields: ReactElement[];
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
}
