import { Pagination as MtPagination } from '@mantine/core';
import { useListPaginationContext } from '@maesa-admin/core';
import { FC } from 'react';

export const Pagination = (props: PaginationProps): JSX.Element | null => {
  const {
    total: initialTotal,
    page,
    limit,
    setPage,
  } = useListPaginationContext(props);

  const total = Math.abs(initialTotal / limit);

  if (total < limit) return null;

  return (
    <div>
      <MtPagination
        onChange={(page) => {
          setPage(page);
        }}
        page={page}
        total={total}
      />
    </div>
  );
};

export interface PaginationProps {
  onChange?: (arg: void) => void;
}
