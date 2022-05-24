import { Skeleton, Text } from '@mantine/core';
import { Children, ReactElement } from 'react';
import { generateRandomString } from '../helper/generateRandomString';

export const TableBodyRowSkeleton = (
  props: TableBodyRowSkeletonProps
): JSX.Element => {
  const { children, hasBulkActions } = props;
  return (
    <tr>
      {hasBulkActions && (
        <td>
          <Skeleton>{generateRandomString(3)}</Skeleton>
        </td>
      )}
      {Children.map(children, (field, index) => {
        if (!field?.props.source) return null;
        return (
          <td>
            <Skeleton>
              <Text size="lg">{generateRandomString()}</Text>
            </Skeleton>
          </td>
        );
      })}
    </tr>
  );
};

export interface TableBodyRowSkeletonProps {
  children?: ReactElement | ReactElement[];
  hasBulkActions?: boolean;
}
