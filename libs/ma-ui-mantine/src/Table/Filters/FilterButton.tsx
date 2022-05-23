import { useListContext } from '@maesa-admin/core';
import { ReactElement, useCallback, useMemo } from 'react';
import _get from 'lodash/get';
import { FilterButtonMenuItem } from './FilterButtonMenuItem';
import { ActionIcon, Menu } from '@mantine/core';
import { IconFilter } from '@tabler/icons';

export const FilterButton = (props: FilterButtonProps): ReactElement | null => {
  const { filters } = props;

  const {
    displayedFilters = {},
    filterValues,
    showFilter,
  } = useListContext(props);

  const hiddenFilter = useMemo(() => {
    if (!filters) return [];
    return filters.filter(
      (el: ReactElement) =>
        !el.props.alwaysOn &&
        !displayedFilters[el.props.source] &&
        typeof _get(filterValues, el.props.source) === 'undefined'
    );
  }, [filters, filterValues, displayedFilters]);

  const handleShow = useCallback(
    ({ source, defaultValue }: { source: string; defaultValue: string }) => {
      showFilter(source, defaultValue === '' ? undefined : defaultValue);
    },
    [showFilter]
  );

  if (
    !filters ||
    hiddenFilter.length === 0 ||
    (Array.isArray(filters) && filters.length === 0)
  ) {
    return null;
  }

  return (
    <div>
      <Menu
        data-role="filter-buttons-menu"
        control={
          <ActionIcon
            data-role="filter-buttons"
            disabled={hiddenFilter.length === 0}
          >
            <IconFilter />
          </ActionIcon>
        }
      >
        {hiddenFilter.map((el) => (
          <FilterButtonMenuItem
            key={el.props.source}
            filter={el}
            onShow={handleShow}
          />
        ))}
      </Menu>
    </div>
  );
};

export interface FilterButtonProps {
  filters?: ReactElement[];
  filterValues?: any;
  showFilter?: (filterName: string, defaultValue: any) => void;
  displayedFilters?: any;
}
