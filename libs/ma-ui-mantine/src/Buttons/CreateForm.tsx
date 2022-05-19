import { Formik } from 'formik';
import { cloneElement, ReactElement, useMemo } from 'react';

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
    console.log(values);
    return values;
  }, [fields]);
  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues}>
      {({ handleSubmit, values }) => (
        <form onSubmit={handleSubmit}>
          {fields.map((el) => {
            return cloneElement(el, {
              key: el.props.source,
              value: values[el.props.source],
              ...el.props,
            });
          })}
        </form>
      )}
    </Formik>
  );
};

export interface CreateFormProps {
  initialValues?: any;
  fields: ReactElement[];
  onSubmit: (values: any) => void;
}
