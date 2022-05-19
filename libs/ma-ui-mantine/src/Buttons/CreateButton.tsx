import { Button, Drawer } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconPlus, IconX } from '@tabler/icons';
import { FormikHelpers } from 'formik';
import { ReactElement, useState } from 'react';
import { CreateForm, CreateFormProps } from './CreateForm';

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
        {isOpen && (
          <CreateForm
            fields={fields}
            onSubmit={(values, helpers) => {
              const { setSubmitting } = helpers;
              try {
                onSubmit(values, helpers);
                setOpen(false);
              } catch (err: any) {
                showNotification({
                  color: "red",
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
  fields: ReactElement[];
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
}
