import { Text } from '@mantine/core';
import { useRecordContext } from '@maesa-admin/core';
import get from 'lodash/get';
import { PublicFieldProps } from './types';

export const TextField = (props: TextFieldProps): JSX.Element => {
  const { label, source, showLabel = true } = props;
  const record = useRecordContext();
  const value = get(record, source);
  return (
    <div>
      {showLabel && (
        <Text size="sm" color="gray">
          {label}
        </Text>
      )}
      <Text>{value}</Text>
    </div>
  );
};

export interface TextFieldProps extends PublicFieldProps {
  showLabel?: boolean;
}
