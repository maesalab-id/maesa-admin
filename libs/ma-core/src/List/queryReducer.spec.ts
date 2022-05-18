import { queryReducer, SORT_ASC, SORT_DESC } from './queryReducer';

describe('Query Reducer', () => {
  describe('SET_PAGE action', () => {
    it('should update the page', () => {
      const updatedState = queryReducer(
        {
          page: 1,
          order: '',
          sort: '',
          filter: undefined,
          displayedFilters: undefined,
          limit: 0,
        },
        {
          type: 'SET_PAGE',
          payload: 2,
        }
      );
      expect(updatedState.page).toEqual(2);
    });
    it('should not update the filter', () => {
      const initialFilter = {};
      const updatedState = queryReducer(
        {
          page: 1,
          order: '',
          sort: '',
          filter: initialFilter,
          displayedFilters: undefined,
          limit: 0,
        },
        {
          type: 'SET_PAGE',
          payload: 2,
        }
      );
      expect(updatedState.filter).toEqual(initialFilter);
    });
  });

  describe('SET_FILTER action', () => {
    it('should add new filter with given value when set', () => {
      const initialFilter = undefined;
      const newFilter = { title: 'foo' };
      const updatedState = queryReducer(
        {
          order: '',
          page: 0,
          limit: 0,
          sort: '',
          filter: initialFilter,
          displayedFilters: undefined,
        },
        {
          type: 'SET_FILTER',
          payload: { filter: newFilter },
        }
      );
      expect(updatedState.filter).not.toEqual(initialFilter);
      expect(updatedState.filter).toEqual(newFilter);
    });
    it('should replace existing filter with given value', () => {
      const initialFilter = { title: 'foo' };
      const newFilter = { title: 'bar' };
      const updatedState = queryReducer(
        {
          order: '',
          page: 0,
          limit: 0,
          sort: '',
          filter: initialFilter,
          displayedFilters: undefined,
        },
        {
          type: 'SET_FILTER',
          payload: { filter: newFilter },
        }
      );
      expect(updatedState.filter).not.toEqual(initialFilter);
      expect(updatedState.filter).toEqual(newFilter);
    });
    it('should add new filter and displayedFilter with given value when set', () => {
      const updatedState = queryReducer(
        {
          order: '',
          page: 0,
          limit: 0,
          sort: '',
          filter: undefined,
          displayedFilters: undefined,
        },
        {
          type: 'SET_FILTER',
          payload: {
            filter: {
              title: 'foo',
            },
            displayedFilters: {
              title: true,
            },
          },
        }
      );
      expect(updatedState.filter).not.toEqual(undefined);
      expect(updatedState.filter).toEqual({ title: 'foo' });
      expect(updatedState.displayedFilters).toEqual({ title: true });
    });
    it('should reset page to 1', () => {
      const updatedState = queryReducer(
        {
          page: 7,
          order: '',
          limit: 0,
          sort: '',
          filter: undefined,
          displayedFilters: undefined,
        },
        {
          type: 'SET_FILTER',
          payload: {
            filter: { title: 'foo' },
          },
        }
      );
      expect(updatedState.page).toEqual(1);
    });
  });
  describe('SHOW_FILTER action', () => {
    it('should add the filter to be displayed filters and set the filter value', () => {
      const updatedState = queryReducer(
        {
          filter: {
            bar: 1,
          },
          displayedFilters: {
            bar: true,
          },
          order: '',
          page: 0,
          limit: 0,
          sort: '',
        },
        {
          type: 'SHOW_FILTER',
          payload: { filterName: 'foo', defaultValue: 'bar' },
        }
      );
      expect(updatedState.filter).toEqual({ bar: 1, foo: 'bar' });
      expect(updatedState.displayedFilters).toEqual({ bar: true, foo: true });
    });
    it('should work with false default value', () => {
      const updatedState = queryReducer(
        {
          filter: {},
          displayedFilters: {},
          order: '',
          page: 0,
          limit: 0,
          sort: '',
        },
        {
          type: 'SHOW_FILTER',
          payload: { filterName: 'foo', defaultValue: false },
        }
      );
      expect(updatedState.filter).toEqual({ foo: false });
      expect(updatedState.displayedFilters).toEqual({ foo: true });
    });
    it('should work without defaultValue', () => {
      const updatedState = queryReducer(
        {
          filter: { bar: 1 },
          displayedFilters: { bar: true },
          order: '',
          page: 0,
          limit: 0,
          sort: '',
        },
        {
          type: 'SHOW_FILTER',
          payload: { filterName: 'foo' },
        }
      );
      expect(updatedState.filter).toEqual({ bar: 1 });
      expect(updatedState.displayedFilters).toEqual({ bar: true, foo: true });
    });
    it('should not change an already shown filter', () => {
      const updatedState = queryReducer(
        {
          filter: { foo: 1 },
          displayedFilters: { foo: true },
          order: '',
          page: 0,
          limit: 0,
          sort: '',
        },
        {
          type: 'SHOW_FILTER',
          payload: { filterName: 'foo', defaultValue: 'bar' },
        }
      );
      expect(updatedState.filter).toEqual({ foo: 1 });
      expect(updatedState.displayedFilters).toEqual({ foo: true });
    });
  });
  describe('HIDE_FILTER action', () => {
    it('should remove the filter from the displayed filters and reset the filter value', () => {
      const updatedState = queryReducer(
        {
          filter: { foo: 2, bar: 2 },
          displayedFilters: { foo: true, bar: true },
          order: '',
          page: 0,
          limit: 0,
          sort: '',
        },
        {
          type: 'HIDE_FILTER',
          payload: 'bar',
        }
      );
      expect(updatedState.filter).toEqual({ foo: 2 });
      expect(updatedState.displayedFilters).toEqual({ foo: true });
    });
    it('should do nothing if the filter is already hidden', () => {
      const updatedState = queryReducer(
        {
          filter: { foo: 2 },
          displayedFilters: { foo: true },
          order: '',
          page: 0,
          limit: 0,
          sort: '',
        },
        {
          type: 'HIDE_FILTER',
          payload: 'bar',
        }
      );
      expect(updatedState.filter).toEqual({ foo: 2 });
      expect(updatedState.displayedFilters).toEqual({ foo: true });
    });
  });
  describe('SET_SORT action', () => {
    it('should set SORT_ASC order by default when sort value is new', () => {
      const updatedState = queryReducer(
        {
          order: '',
          page: 0,
          limit: 0,
          sort: '',
          filter: undefined,
          displayedFilters: undefined,
        },
        {
          type: 'SET_SORT',
          payload: { field: 'foo' },
        }
      );
      expect(updatedState.sort).toEqual('foo');
      expect(updatedState.order).toEqual(SORT_ASC);
      expect(updatedState.page).toEqual(1);
    });
    it('should set order by payload.order value when sort value is new', () => {
      const updatedState = queryReducer(
        {
          order: '',
          page: 0,
          limit: 0,
          sort: '',
          filter: undefined,
          displayedFilters: undefined,
        },
        {
          type: 'SET_SORT',
          payload: { field: 'foo', order: SORT_DESC },
        }
      );
      expect(updatedState.sort).toEqual('foo');
      expect(updatedState.order).toEqual(SORT_DESC);
      expect(updatedState.page).toEqual(1);
    });
    it("should set order as the opposite of the one in previous state when sort hasn't change", () => {
      const updatedState = queryReducer(
        {
          sort: 'foo',
          order: SORT_DESC,
          page: 1,
          limit: 0,
          filter: undefined,
          displayedFilters: undefined,
        },
        {
          type: 'SET_SORT',
          payload: { field: 'foo' },
        }
      );
      expect(updatedState.sort).toEqual('foo');
      expect(updatedState.order).toEqual(SORT_ASC);
      expect(updatedState.page).toEqual(1);
    });
    it("should set order as the opposite of the one in previous state even if order is specified in the payload when sort hasn't change", () => {
      const updatedState = queryReducer(
        {
          sort: 'foo',
          order: SORT_DESC,
          page: 1,
          limit: 0,
          filter: undefined,
          displayedFilters: undefined,
        },
        {
          type: 'SET_SORT',
          payload: { field: 'foo', order: SORT_DESC },
        }
      );
      expect(updatedState.sort).toEqual('foo');
      expect(updatedState.order).toEqual(SORT_ASC);
      expect(updatedState.page).toEqual(1);
    });
  });
  describe('SET_LIMIT action', () => {
    it('should update limit count', () => {
      const updatedState = queryReducer(
        {
          limit: 10,
          order: '',
          page: 0,
          sort: '',
          filter: undefined,
          displayedFilters: undefined,
        },
        {
          type: 'SET_LIMIT',
          payload: 25,
        }
      );
      expect(updatedState.limit).toEqual(25);
    });
    it('should reset page to 1', () => {
      const updatedState = queryReducer(
        {
          page: 5,
          limit: 10,
          order: '',
          sort: '',
          filter: undefined,
          displayedFilters: undefined,
        },
        {
          type: 'SET_LIMIT',
          payload: 25,
        }
      );
      expect(updatedState.page).toEqual(1);
    });
  });
});
