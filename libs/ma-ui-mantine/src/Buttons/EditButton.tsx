import { Identifier, useListContext } from '@maesa-admin/core';
import { ActionIcon, Drawer, DrawerProps, Tooltip } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconEdit, IconX } from '@tabler/icons';
import { FormikHelpers } from 'formik';
import { ReactElement, useState } from 'react';
import { EditForm } from './EditForm';
import { ListHelper } from './types';

export const EditButton = (props: EditButtonProps): JSX.Element => {
  const { drawer, fields, onSubmit } = props;
  const [isOpen, setOpen] = useState(false);
  const { refetch } = useListContext();
  return (
    <>
      <Tooltip label="Edit" position="left" withArrow={true}>
        <ActionIcon
          color="primary"
          size="lg"
          onClick={() => setOpen((o) => !o)}
        >
          <IconEdit size={14} />
        </ActionIcon>
      </Tooltip>
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
            onSubmit={async (id, values, helpers) => {
              const { setSubmitting, setErrors } = helpers;
              try {
                await onSubmit(id, values, helpers, { refetch });
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

  onSubmit: (
    id: Identifier,
    values: T,
    formikHelpers: FormikHelpers<T>,
    listHelper: ListHelper
  ) => void | Promise<any>;
}
