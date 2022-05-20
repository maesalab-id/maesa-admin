import {
  ChoicesContextProvider,
  GetListResult,
  MaRecord,
  QueryFunctionArgs,
  useChoicesContext,
  useListController,
} from '@maesa-admin/core';
import {
  Group,
  Loader,
  Select,
  SelectItem,
  SelectItemProps,
  Text,
} from '@mantine/core';
import { SelectSharedProps } from '@mantine/core/lib/components/Select/Select';
import { useField } from 'formik';
import { useMemo } from 'react';
import { CommonInputProps } from '../Table';

export const SelectInput = (props: SelectInputProps): JSX.Element => {
  const { queryFn, queryOptions, ...rest } = props;
  return (
    <ChoicesContextProvider
      value={useListController({
        limit: 1000,
        resource: `choices-${props.source}`,
        queryFn,
        queryOptions,
      })}
    >
      <SelectInputBase {...rest} />
    </ChoicesContextProvider>
  );
};

const SelectInputBase = (props: SelectInputBaseProps): JSX.Element => {
  const {
    label,
    choices: initialChoices,
    alwaysOn,
    minimal = false,
    source,
    defaultValue,
    placeholder: initialPlaceholder,
    ...rest
  } = props;

  const { data, setFilters, displayedFilters, filterValues, isLoading } =
    useChoicesContext();

  const [{ name, value }, meta, { setValue }] = useField({
    name: source,
    value: filterValues.query,
  });

  const placeholder = useMemo<string>((): string => {
    let l = label;
    if (typeof l !== 'string') l = undefined;
    if (!minimal) l = undefined;
    return initialPlaceholder || l || source;
  }, [initialPlaceholder, label, minimal]);

  const choices = useMemo<
    SelectSharedProps<SelectItem, string | null>['data']
  >(() => {
    let result;
    if (typeof initialChoices === 'function') {
      result = initialChoices(data);
    } else {
      result = initialChoices || [];
    }

    return result;
  }, [initialChoices, data]);

  return (
    <Select
      {...rest}
      label={!minimal && label}
      placeholder={placeholder}
      searchable={true}
      clearable={true}
      nothingFound={
        isLoading ? (
          <Group align="center" sx={{ justifyContent: 'center' }} spacing="xs">
            <Loader size={12} />
            <Text size="sm">Loading</Text>
          </Group>
        ) : (
          'Type something'
        )
      }
      onSearchChange={(query) => {
        setFilters({ query }, displayedFilters);
      }}
      name={name}
      value={value}
      onChange={(value) => {
        setValue(value);
      }}
      data={choices}
    />
  );
};

export interface SelectInputProps<RecordType extends MaRecord = any>
  extends SelectInputBaseProps<RecordType> {
  queryFn?: (
    args: QueryFunctionArgs
  ) =>
    | (GetListResult<RecordType> | null)
    | Promise<GetListResult<RecordType> | null>;
  queryOptions?: any;
}

interface SelectInputBaseProps<RecordType extends MaRecord = any>
  extends CommonInputProps {
  choices?: SelectItem[] | ((data: RecordType[]) => SelectItem[]);
  source: string;
  minimal?: boolean;
}
