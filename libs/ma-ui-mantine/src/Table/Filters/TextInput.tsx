import { ActionIcon, Loader, TextInput as MtTextInput } from '@mantine/core';
import { useListContext } from '@maesa-admin/core';
import { FC, useEffect, useState } from 'react';
import { IconBackspace } from '@tabler/icons';
import { CommonInputProps } from './types';

interface TextInputProps extends CommonInputProps {
  source?: string;
}

export const TextInput: FC<TextInputProps> = (props) => {
  const { placeholder, source = 'q' } = props;

  const [localValue, setLocalValue] = useState<string>('');
  const { isLoading, setFilters } = useListContext();

  useEffect(() => {
    setFilters({
      [source]: localValue,
    });
  }, [localValue, source, setFilters]);

  return (
    <MtTextInput
      placeholder={placeholder || source}
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
