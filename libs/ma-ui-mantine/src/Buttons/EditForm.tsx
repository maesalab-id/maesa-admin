import { Box, Button, Group } from '@mantine/core';
import { Formik, FormikHelpers } from 'formik';
import { cloneElement, ReactElement, useMemo } from 'react';
import _get from 'lodash/get';
import {
  Identifier,
  useListContext,
  useRecordContext,
} from '@maesa-admin/core';
import { ListHelper } from './types';

export const EditForm = (props: EditFormProps): JSX.Element => {
  const { fields, onSubmit } = props;

  const { refetch } = useListContext();

  const record = useRecordContext(props);

  const initialValues = useMemo(() => {
    const values = fields.reduce<{ [key: string]: any }>(
      (currentValues, el) => {
        currentValues[el.props.source] =
          _get(record, el.props.source) || el.props.defaultValue || undefined;
        return currentValues;
      },
      {}
    );
    return values;
  }, [fields]);

  const listHelper = {
    refetch,
  };

  return (
    <Formik
      onSubmit={(values, helpers) =>
        onSubmit(_get(record, 'id') as Identifier, values, helpers, listHelper)
      }
      initialValues={initialValues}
    >
      {({ values, errors, handleSubmit, resetForm, isSubmitting }) => (
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

export interface EditFormProps<T = { [key: string]: any }> {
  initialValues?: any;
  fields: ReactElement[];

  onSubmit: (
    id: Identifier,
    values: T,
    formikHelpers: FormikHelpers<T>,
    listHelpers: ListHelper
  ) => void | Promise<any>;
}
