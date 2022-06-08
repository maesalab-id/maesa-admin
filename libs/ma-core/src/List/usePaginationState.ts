import { useCallback, useEffect, useReducer, useRef } from "react";

export interface PaginationPayload {
  skip: number;
  page: number;
  limit: number;
}

const paginationReducer = (
  prevState: PaginationPayload,
  nextState: Partial<PaginationPayload>
): PaginationPayload => {
  return {
    ...prevState,
    ...nextState,
  }
}

export const defaultPagination: PaginationPayload = {
  skip: 0,
  page: 1,
  limit: 25,
};

export interface PaginationHookResult {
  skip: number;
  page: number;
  limit: number;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setPagination: (pagination: PaginationPayload) => void;
}

export const usePaginationState = (
  initialPagination: {
    skip?: number;
    page?: number;
    limit?: number;
  } = {}
): PaginationHookResult => {
  const [pagination, setPagination] = useReducer(paginationReducer, {
    ...defaultPagination,
    ...initialPagination
  });

  const isFirstRender = useRef(true);

  const setLimit = useCallback((limit: number | undefined) => setPagination({ limit, page: 1 }), [])

  const setPage = useCallback((page: number) => {
    setPagination({ page })
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setLimit(initialPagination.limit);
  }, [initialPagination.limit, setLimit]);

  return {
    skip: (pagination.page - 1) * pagination.limit,
    page: pagination.page,
    limit: pagination.limit,
    setPagination,
    setPage,
    setLimit,
  }
}