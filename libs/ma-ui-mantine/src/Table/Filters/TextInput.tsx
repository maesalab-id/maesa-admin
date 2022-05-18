import { ActionIcon, Loader, TextInput as MtTextInput } from '@mantine/core';
import { useListContext } from '@maesa-admin/core';
import { FC, useEffect, useMemo, useState } from 'react';
import { IconBackspace } from '@tabler/icons';
import { CommonInputProps } from './types';

interface TextInputProps extends CommonInputProps {
  source?: string;
}

export const TextInput = (props: TextInputProps): JSX.Element => {
  const { label, placeholder: initialPlaceholder, source = 'q' } = props;

  const [localValue, setLocalValue] = useState<string>('');
  const { isLoading, setFilters } = useListContext();

  useEffect(() => {
    setFilters({
      [source]: localValue,
    });
  }, [localValue, source, setFilters]);

  const placeholder = useMemo<string>((): string => {
    let l = label;
    if (typeof l !== 'string') l = undefined;
    return initialPlaceholder || l || source;
  }, [initialPlaceholder, label]);

  return (
    <MtTextInput
      placeholder={placeholder}
      value={localValue}
      onChange={(e) => {
        let value = e.target.value;
        setLocalValue(value);
      }}
      rightSection={
        isLoading ? (
          <Loader size="sm" />
        ) : localValue ? (
          <ActionIcon onClick={() => setLocalValue('')}>
            <IconBackspace />
          </ActionIcon>
        ) : null
      }
    />
  );
};
