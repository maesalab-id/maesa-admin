import { useListContext } from '@maesa-admin/core';
import { Button, Drawer, DrawerProps } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconPlus, IconX } from '@tabler/icons';
import { FormikHelpers } from 'formik';
import { useState } from 'react';
import {
  CreateForm,
  CreateFormAlternativeProps,
  CreateFormPrimaryProps,
} from './CreateForm';
import { ListHelper } from './types';

export const CreateButton = (props: CreateButtonProps): JSX.Element => {
  const {
    validationSchema,
    validateOnChange,
    initialValues,
    children,
    drawer,
    fields,
    onSubmit,
  } = props;
  const [isOpen, setOpen] = useState(false);
  const { refetch } = useListContext();
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
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnChange={validateOnChange}
            fields={fields}
            onSubmit={async (values, helpers) => {
              if (!onSubmit) return;
              const { setSubmitting, setErrors } = helpers;
              try {
                await onSubmit(values, helpers, { refetch });
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
          </CreateForm>
        )}
      </Drawer>
    </>
  );
};

export type CreateButtonProps<T = { [key: string]: any }> =
  | CreateButtonPrimaryProps<T>
  | CreateButtonAlternativeProps<T>;

export interface CreateButtonPrimaryProps<T = { [key: string]: any }>
  extends CreateButtonBaseProps<T>,
    Omit<CreateFormPrimaryProps<T>, 'onSubmit'> {}

export interface CreateButtonAlternativeProps<T = { [key: string]: any }>
  extends CreateButtonBaseProps<T>,
    Omit<CreateFormAlternativeProps<T>, 'onSubmit'> {}

export interface CreateButtonBaseProps<T = { [key: string]: any }> {
  drawer?: DrawerProps;
  onSubmit: OnSubmitType<T>;
}

type OnSubmitType<T = { [key: string]: any }> = (
  values: T,
  helpers: FormikHelpers<T>,
  listHelper: ListHelper
) => void | Promise<any>;
