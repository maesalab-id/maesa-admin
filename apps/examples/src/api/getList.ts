import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

export const getList = async (
  resource: string,
  props?: GetListProps
): Promise<GetListResult> => {
  let limit = props?.limit || 10;
  let page = props?.page || 0;
  let filter = props?.filter;
  let query = props?.query || {};
  query = omitBy(query, isNil);

  const urlSearchParams = new URLSearchParams({
    ...filter,
    _limit: `${limit}`,
    _page: `${page}`,
    ...query,
  });

  const url = new URL(
    `http://localhost:4300/${resource}?${urlSearchParams.toString()}`
  );

  const response = await fetch(url.toString());
  const result = await response.json();
  const total = response.headers.get('X-Total-Count');

  return {
    limit: limit,
    total: Number(total),
    page: page,
    skip: 0,
    data: result,
  };
};

export interface GetListResult<T extends { [key: string]: any } = any> {
  limit: number;
  total: number;
  page: number;
  skip: number;
  data: T;
}

export interface GetListProps {
  limit?: number;
  page?: number;
  query?: object;
  filter?: {
    [key: string]: any;
  };
}
