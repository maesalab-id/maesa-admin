import { Reducer } from 'react';
import { ListParams } from './useListParams';
import _set from 'lodash/set';
import removeEmpty from '../utils/removeEmpty';
import removeKey from '../utils/removeKey';
import { SortPayload } from '../types';

export const SET_SORT = 'SET_SORT';
export const SORT_ASC = 'ASC';
export const SORT_DESC = 'DESC';

export const SET_PAGE = 'SET_PAGE';
export const SET_LIMIT = 'SET_LIMIT';
export const SET_FILTER = 'SET_FILTER';
export const SHOW_FILTER = 'SHOW_FILTER';
export const HIDE_FILTER = 'HIDE_FILTER';

const oppositeOrder = (direction: string) =>
  direction === SORT_DESC ? SORT_ASC : SORT_DESC;

export type QueryReducerActionTypes =
  | {
      type: typeof SET_SORT;
      payload:
        | SortPayload
        | {
            field: string;
            order?: typeof SORT_ASC | typeof SORT_DESC;
          };
    }
  | {
      type: typeof SET_PAGE;
      payload: number;
    }
  | {
      type: typeof SET_LIMIT;
      payload: number;
    }
  | {
      type: typeof SET_FILTER;
      payload: {
        filter: any;
        displayedFilters?: {
          [key: string]: boolean;
        };
      };
    }
  | {
      type: typeof SHOW_FILTER;
      payload: {
        filterName: string;
        defaultValue?: any;
      };
    }
  | {
      type: typeof HIDE_FILTER;
      payload: string;
    };

export const queryReducer: Reducer<ListParams, QueryReducerActionTypes> = (
  previousState,
  action
) => {
  switch (action.type) {
    case SET_SORT:
      if (action.payload.field === previousState.sort) {
        return {
          ...previousState,
          order: oppositeOrder(previousState.order),
          page: 1,
        };
      }
      return {
        ...previousState,
        sort: action.payload.field,
        order: action.payload.order || SORT_ASC,
        page: 1,
      };
    case SET_PAGE:
      return {
        ...previousState,
        page: action.payload,
      };
    case SET_LIMIT:
      return {
        ...previousState,
        limit: action.payload,
        page: 1,
      };
    case SET_FILTER:
      return {
        ...previousState,
        page: 1,
        filter: action.payload.filter,
        displayedFilters: action.payload.displayedFilters
          ? action.payload.displayedFilters
          : previousState.displayedFilters,
      };
    case SHOW_FILTER: {
      if (
        previousState.displayedFilters &&
        previousState.displayedFilters[action.payload.filterName]
      ) {
        return previousState;
      }
      return {
        ...previousState,
        filter:
          typeof action.payload.defaultValue !== 'undefined'
            ? _set(
                previousState.filter,
                action.payload.filterName,
                action.payload.defaultValue
              )
            : previousState.filter,
        displayedFilters: {
          ...previousState.displayedFilters,
          [action.payload.filterName]: true,
        },
      };
    }
    case HIDE_FILTER: {
      return {
        ...previousState,
        filter: removeEmpty(removeKey(previousState.filter, action.payload)),
        displayedFilters: previousState.displayedFilters
          ? Object.keys(previousState.displayedFilters).reduce(
              (filters, filter) => {
                return filter !== action.payload
                  ? { ...filters, [filter]: true }
                  : filters;
              },
              {}
            )
          : previousState.displayedFilters,
      };
    }
    default:
      return previousState;
  }
};
