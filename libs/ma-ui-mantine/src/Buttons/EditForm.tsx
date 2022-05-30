import { Box, Button, Group, Stack } from '@mantine/core';
import { Formik, FormikHelpers } from 'formik';
import { cloneElement, ReactElement, ReactNode, useMemo } from 'react';
import _get from 'lodash/get';
import {
  Identifier,
  useListContext,
  useRecordContext,
} from '@maesa-admin/core';
import { ListHelper } from './types';

export const EditForm = (props: EditFormProps): JSX.Element => {
  const { children, fields, validateOnChange, validationSchema, onSubmit } =
    props;

  const { refetch } = useListContext();

  const record = useRecordContext(props);

  const initialValues = useMemo(() => {
    if (typeof props.initialValues !== 'undefined') return props.initialValues;
    if (!fields) return record;

    let values = fields?.reduce<{ [key: string]: any }>((currentValues, el) => {
      const s = el.props.source;
      currentValues[s] = el.props.defaultValue || record?.[s] || undefined;
      return currentValues;
    }, {});
    return values;
  }, [props.initialValues, record, fields]);

  const listHelper: ListHelper = {
    refetch,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={validateOnChange}
      onSubmit={(values, helpers) =>
        onSubmit(_get(record, 'id') as Identifier, values, helpers, listHelper)
      }
    >
      {({ values, errors, handleSubmit, resetForm, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <Stack>
            {children}
            {fields?.map((el) => {
              return cloneElement(el, {
                key: el.props.source,
                value: values[el.props.source],
                mb: 'md',
                ...el.props,
              });
            })}
          </Stack>
          <Group mt="lg">
            <Box sx={{ flexGrow: 1 }} />
            <Button
              type="reset"
              color="gray"
              variant="subtle"
              onClick={() => {
                resetForm();
              }}
            >
              Reset
            </Button>
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

export type EditFormProps<T = { [key: string]: any }> =
  | EditFormPrimaryProps<T>
  | EditFormAlternativeProps<T>;

export interface EditFormPrimaryProps<T = { [key: string]: any }>
  extends EditFormBaseProps<T> {
  fields: ReactElement[];
  initialValues?: any;
  children?: ReactNode;
}

export interface EditFormAlternativeProps<T = { [key: string]: any }>
  extends EditFormBaseProps<T> {
  fields?: ReactElement[];
  initialValues?: any;
  children: ReactNode;
}

export interface EditFormBaseProps<T = { [key: string]: any }> {
  onSubmit: OnSubmitType<T>;
  validationSchema?: any;
  validateOnChange?: boolean;
}

type OnSubmitType<T = { [key: string]: any }> = (
  id: Identifier,
  values: T,
  formikHelpers: FormikHelpers<T>,
  listHelpers: ListHelper
) => void | Promise<any>;
