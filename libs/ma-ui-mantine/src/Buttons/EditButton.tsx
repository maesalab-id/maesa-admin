import { Identifier } from '@maesa-admin/core';
import { Button, Drawer, DrawerProps } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconEdit, IconX } from '@tabler/icons';
import { FormikHelpers } from 'formik';
import { ReactElement, useState } from 'react';
import { EditForm } from './EditForm';

export const EditButton = (props: EditButtonProps): JSX.Element => {
  const { drawer, fields, onSubmit } = props;
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="subtle"
        leftIcon={<IconEdit size={14} />}
        onClick={() => setOpen((o) => !o)}
      >
        Edit
      </Button>
      <Drawer
        {...drawer}
        title={'Edit'}
        padding={'xl'}
        size="xl"
        opened={isOpen}
        onClose={() => setOpen(false)}
      >
        {isOpen && (
          <EditForm
            fields={fields}
            onSubmit={(id, values, helpers) => {
              const { setSubmitting, setErrors } = helpers;
              try {
                onSubmit(id, values, helpers);
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

export interface EditButtonProps<T = { [key: string]: any }> {
  drawer?: DrawerProps;
  fields: ReactElement[];
  onSubmit: (id: Identifier, values: T, helpers: FormikHelpers<T>) => void;
}
