import { Formik, useFormikContext } from "formik"
import { FC, ReactElement, useCallback } from "react";
import { FilterFormInput } from "./FilterFormInput";
import _get from "lodash/get";
import { useListContext } from "@maesa-admin/core";
import { Group } from "@mantine/core";

export const FilterForm: FC<FilterFormProps> = (props): ReactElement => {
  const {
    initalValues,
    filters
  } = props;

  return (
    <Formik
      initialValues={initalValues}
      onSubmit={() => {

      }}
    >
      {({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <FilterFormBase filters={filters} />
          </form>
        )
      }}
    </Formik>
  )
}

export const FilterFormBase: FC<FilterFormBaseProps> = (props): ReactElement => {
  const { filters } = props;
  const form = useFormikContext();
  const { displayedFilters = {}, hideFilter } = useListContext();
  const getShownFilters = useCallback(() => {
    if (!filters) return [];
    const values = form.values;
    const result = filters.filter((el: ReactElement) => {
      const filterValues = _get(values, el.props.source);
      return (
        el.props.alwaysOn
        || displayedFilters[el.props.source]
        || (filterValues !== '' && typeof filterValues !== 'undefined')
      )
    });
    return result;
  }, [filters, displayedFilters, form.values]);

  const handleHide = useCallback((filterName: string) => {
    hideFilter(filterName)
  }, [hideFilter]);

  return (
    <Group>
      {getShownFilters().map((el: ReactElement) => (
        <FilterFormInput
          key={el.props.source}
          element={el}
          onHide={() => handleHide(el.props.source)}
        />
      ))}
    </Group>
  )
}

interface FilterFormBaseProps {
  filters?: ReactElement[];
}

interface FilterFormProps extends FilterFormBaseProps {
  initalValues?: any;
}