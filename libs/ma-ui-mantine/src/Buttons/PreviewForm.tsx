import { cloneElement, ReactElement, ReactNode, useMemo } from 'react';
import _get from 'lodash/get';
import { Box } from '@mantine/core';

export const PreviewForm = (props: PreviewFormProps): JSX.Element => {
  const { fields, children } = props;

  return (
    <>
      {!children &&
        fields?.map((el) => {
          return <Box mb="md">{cloneElement(el)}</Box>;
        })}
      {children}
    </>
  );
};

export interface PreviewFormProps<T = { [key: string]: any }> {
  initialValues?: any;
  fields?: ReactElement[];
  children?: ReactNode;
}
