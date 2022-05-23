import { Formik, useFormikContext } from 'formik';
import { FC, ReactElement, useCallback, useEffect, useMemo } from 'react';
import { FilterFormInput } from './FilterFormInput';
import _get from 'lodash/get';
import _unset from 'lodash/unset';
import _cloneDeep from 'lodash/cloneDeep';
import { useListContext } from '@maesa-admin/core';
import { Group } from '@mantine/core';

export const FilterForm: FC<FilterFormProps> = (props): ReactElement => {
  const { filters } = props;

  const initialValues = useMemo(() => {
    if (!filters) return {};
    return filters.reduce<{ [key: string]: any }>((currentValues, el) => {
      const key = el.props.source;
      currentValues[key] = el.props.defaultValue || undefined;
      return currentValues;
    }, {});
  }, [filters]);

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      onSubmit={() => {
        /* no-op */
      }}
      enableReinitialize={false}
    >
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <FilterFormBase filters={filters} />
          </form>
        );
      }}
    </Formik>
  );
};

export const FilterFormBase = (props: FilterFormBaseProps): JSX.Element => {
  const { filters } = props;
  const form = useFormikContext<{ [key: string]: any }>();
  const { displayedFilters = {}, hideFilter, setFilters } = useListContext();

  const getShownFilters = useCallback(() => {
    if (!filters) return [];
    const values = form.values;
    const result = filters.filter((el: ReactElement) => {
      const filterValues = _get(values, el.props.source);
      const key = el.props.source;
      return (
        el.props.alwaysOn ||
        displayedFilters[key] ||
        (filterValues !== '' && typeof filterValues !== 'undefined')
      );
    });
    return result;
  }, [filters, displayedFilters, form.values]);

  const handleHide = useCallback(
    (filterName: string) => {
      hideFilter(filterName);
    },
    [hideFilter]
  );

  useEffect(() => {
    if (!filters) return;
    for (const f of filters) {
      const key = f.props.source;
      if (!f.props.alwaysOn && _get(displayedFilters, key) !== true) {
        _unset(form.values, key);
      }
    }
    setFilters(form.values, displayedFilters);
  }, [form.values, displayedFilters, filters]);

  return (
    <Group data-role="filter-form">
      {getShownFilters().map((el: ReactElement) => (
        <FilterFormInput
          key={el.props.source}
          element={el}
          onHide={() => handleHide(el.props.source)}
        />
      ))}
    </Group>
  );
};

export const getFilterFormValues = (
  formValues: Record<string, any>,
  filterValues: Record<string, any>
) => {
  return Object.keys(formValues).reduce((acc, key) => {
    acc[key] = getInputValue(formValues, key, filterValues);
    return acc;
  }, _cloneDeep(filterValues) ?? {});
};

const getInputValue = (
  formValues: Record<string, any>,
  key: string,
  filterValues: Record<string, any>
) => {
  if (formValues[key] === undefined || formValues[key] === null) {
    return '';
  }
  if (Array.isArray(formValues[key])) {
    return _get(filterValues, key, '');
  }
  if (formValues[key] instanceof Date) {
    return _get(filterValues, key, '');
  }
  if (typeof formValues[key] === 'object') {
    return Object.keys(formValues[key]).reduce<{ [key: string]: any }>(
      (acc, innerKey) => {
        acc[innerKey] = getInputValue(
          formValues[key],
          innerKey,
          (filterValues || {})[key] ?? {}
        );
        return acc;
      },
      {}
    );
  }
  return _get(filterValues, key, '');
};

interface FilterFormBaseProps {
  filters?: ReactElement[];
}

interface FilterFormProps extends FilterFormBaseProps {
  initalValues?: any;
}
