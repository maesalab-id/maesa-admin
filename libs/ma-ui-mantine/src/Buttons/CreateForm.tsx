import { Box, Button, Group, Notification, Stack } from '@mantine/core';
import { Formik, FormikHelpers } from 'formik';
import { cloneElement, ReactElement, ReactNode, useMemo } from 'react';
import _get from 'lodash/get';

export const CreateForm = (props: CreateFormProps): JSX.Element => {
  const { children, fields, onSubmit } = props;

  const initialValues = useMemo(() => {
    if (props.initialValues) return props.initialValues;
    let values = fields?.reduce<{ [key: string]: any }>((currentValues, el) => {
      currentValues[el.props.source] = el.props.defaultValue || undefined;
      return currentValues;
    }, {});
    return values;
  }, [props.initialValues, fields]);

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ values, errors, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Stack>
            {children}
            {!children &&
              fields?.map((el) => {
                return cloneElement(el, {
                  key: el.props.source,
                  value: values[el.props.source],
                  ...el.props,
                });
              })}
          </Stack>
          <Group mt={'lg'}>
            <Box sx={{ flexGrow: 1 }} />
            <Button
              type="submit"
              loading={isSubmitting}
              color={Object.keys(errors).length > 0 ? 'gray' : 'primary'}
              variant={Object.keys(errors).length > 0 ? 'light' : 'filled'}
            >
              Submit
            </Button>
          </Group>
        </form>
      )}
    </Formik>
  );
};

export type CreateFormProps<T = { [key: string]: any }> =
  | CreateFormPrimaryProps<T>
  | CreateFormAlternativeProps<T>;

export interface CreateFormPrimaryProps<T = { [key: string]: any }>
  extends CreateFormBaseProps<T> {
  fields: ReactElement[];
  initialValues?: any;
  children?: ReactNode;
}

export interface CreateFormAlternativeProps<T = { [key: string]: any }>
  extends CreateFormBaseProps<T> {
  fields?: ReactElement[];
  initialValues: any;
  children: ReactNode;
}

export interface CreateFormBaseProps<T = { [key: string]: any }> {
  onSubmit: OnSubmitType<T>;
}

type OnSubmitType<T = { [key: string]: any }> = (
  values: T,
  formikHelpers: FormikHelpers<T>
) => void | Promise<any>;
