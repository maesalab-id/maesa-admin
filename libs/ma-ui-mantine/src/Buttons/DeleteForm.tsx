import { Box, Button, Group, Notification } from '@mantine/core';
import { Formik, FormikHelpers } from 'formik';
import { cloneElement, ReactElement, useMemo } from 'react';
import _get from 'lodash/get';

export const CreateForm = (props: CreateFormProps): JSX.Element => {
  const { fields, onSubmit } = props;
  const initialValues = useMemo(() => {
    const values = fields.reduce<{ [key: string]: any }>(
      (currentValues, el) => {
        currentValues[el.props.source] = el.props.defaultValue || undefined;
        return currentValues;
      },
      {}
    );
    return values;
  }, [fields]);
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ values, errors, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          {fields.map((el) => {
            return cloneElement(el, {
              key: el.props.source,
              value: values[el.props.source],
              mb: 'md',
              ...el.props,
            });
          })}
          <Group>
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

export interface CreateFormProps<T = { [key: string]: any }> {
  initialValues?: any;
  fields: ReactElement[];
  onSubmit: (values: T, helpers: FormikHelpers<T>) => void;
}
