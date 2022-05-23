import { Pagination as MtPagination } from '@mantine/core';
import { useListPaginationContext } from '@maesa-admin/core';

export const Pagination = (props: PaginationProps): JSX.Element | null => {
  const {
    total: initialTotal,
    page,
    limit,
    setPage,
    setLimit,
    isLoading,
    ...rest
  } = useListPaginationContext(props);

  const total = Math.abs(initialTotal / limit);

  if (initialTotal < limit) return null;

  return (
    <div {...rest}>
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

export interface PaginationProps extends JSX.IntrinsicAttributes {
  onChange?: (arg: void) => void;
}
