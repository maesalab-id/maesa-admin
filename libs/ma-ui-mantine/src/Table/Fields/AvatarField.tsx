import { Avatar } from '@mantine/core';
import { useRecordContext } from '@maesa-admin/core';
import get from 'lodash/get';
import { PublicFieldProps } from './types';

export const AvatarFields = (props: AvatarFieldsProps): JSX.Element => {
  const { source, parseUrl = (src) => src } = props;
  const record = useRecordContext();
  const value = get(record, source);
  const src = parseUrl(value);
  return (
    <div>
      <Avatar src={src} />
    </div>
  );
};

export interface AvatarFieldsProps extends PublicFieldProps {
  parseUrl?: (src: string) => string;
}