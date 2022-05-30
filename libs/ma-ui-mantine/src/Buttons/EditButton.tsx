import { Identifier, useListContext } from '@maesa-admin/core';
import {
  ActionIcon,
  Drawer,
  DrawerProps,
  Tooltip,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconEdit, IconX } from '@tabler/icons';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import {
  EditForm,
  EditFormAlternativeProps,
  EditFormPrimaryProps,
} from './EditForm';
import { ListHelper } from './types';

export const EditButton = (props: EditButtonProps): JSX.Element => {
  const {
    children,
    drawer,
    fields,
    onSubmit,
    initialValues,
    validateOnChange,
    validationSchema,
  } = props;
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
        styles={{
          drawer: {
            height: '100%',
            overflowY: 'auto',
          },
        }}
      >
        {isOpen && (
          <EditForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={validateOnChange}
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
          >
            {children}
          </EditForm>
        )}
      </Drawer>
    </>
  );
};

export type EditButtonProps<T = { [key: string]: any }> =
  | EditButtonPrimaryProps<T>
  | EditButtonAlternativeProps<T>;

export interface EditButtonPrimaryProps<T = { [key: string]: any }>
  extends EditButtonBaseProps<T>,
    Omit<EditFormPrimaryProps<T>, 'onSubmit'> {}

export interface EditButtonAlternativeProps<T = { [key: string]: any }>
  extends EditButtonBaseProps<T>,
    Omit<EditFormAlternativeProps<T>, 'onSubmit'> {}

export interface EditButtonBaseProps<T = { [key: string]: any }> {
  drawer?: DrawerProps;
  onSubmit: OnSubmitType<T>;
}

type OnSubmitType<T = { [key: string]: any }> = (
  id: Identifier,
  values: T,
  formikHelpers: FormikHelpers<T>,
  listHelper: ListHelper
) => void | Promise<any>;
