import { useCallback, useEffect, useReducer, useRef } from 'react';
import { SortPayload } from '../types';
import { SORT_ASC, SORT_DESC } from './queryReducer';

export interface SortProps {
  setSortField: (field: SortPayload['field']) => void;
  setSortOrder: (order: SortPayload['order']) => void;
  setSort: (sort: SortPayload) => void;
  sort: SortPayload;
}

type Action =
  | { type: 'SET_SORT', payload: SortPayload }
  | { type: 'SET_SORT_FIELD', payload: SortPayload['field'] }
  | { type: 'SET_SORT_ORDER', payload: SortPayload['order'] };

const sortReducer = (state: SortPayload, action: Action): SortPayload => {
  switch (action.type) {
    case 'SET_SORT':
      return action.payload;
    case 'SET_SORT_FIELD': {
      const field = action.payload;
      const order = state.field === field
        ? state.order === SORT_ASC
          ? SORT_DESC
          : SORT_ASC
        : SORT_ASC
      return { field, order };
    }
    case 'SET_SORT_ORDER': {
      const order = action.payload;
      return {
        ...state,
        order
      };
    }
    default:
      return state;
  }
}

export const defaultSort = { field: 'id', order: 'DESC' };

export const useSortState = (initialSort: SortPayload = defaultSort): SortProps => {
  const [sort, dispatch] = useReducer(sortReducer, initialSort);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    dispatch({ type: 'SET_SORT', payload: initialSort });
  }, [initialSort.field, initialSort.order]);

  const setSort = useCallback((sort: SortPayload) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  }, [dispatch])
  const setSortField = useCallback((field: string) => {
    dispatch({ type: 'SET_SORT_FIELD', payload: field });
  }, [dispatch])
  const setSortOrder = useCallback((order: string) => {
    dispatch({ type: 'SET_SORT_ORDER', payload: order });
  }, [dispatch])

  return {
    setSort,
    setSortField,
    setSortOrder,
    sort
  }
}