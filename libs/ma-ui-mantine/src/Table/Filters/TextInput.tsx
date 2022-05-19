import { ActionIcon, Loader, TextInput as MtTextInput } from '@mantine/core';
import { useMemo, useState } from 'react';
import { IconBackspace } from '@tabler/icons';
import { CommonInputProps } from './types';
import { useField } from 'formik';

interface TextInputProps extends CommonInputProps {
  source?: string;
  isLoading?: boolean;
}

export const TextInput = (props: TextInputProps): JSX.Element => {
  const {
    label,
    placeholder: initialPlaceholder,
    isLoading = false,
    source = 'q',
  } = props;

  const [{ value }, meta, { setValue }] = useField({
    name: source,
  });

  const placeholder = useMemo<string>((): string => {
    let l = label;
    if (typeof l !== 'string') l = undefined;
    return initialPlaceholder || l || source;
  }, [initialPlaceholder, label]);

  return (
    <MtTextInput
      placeholder={placeholder}
      value={value || ''}
      onChange={(e) => {
        const value = e.target.value;
        setValue(value);
      }}
      rightSection={
        isLoading ? (
          <Loader size="sm" />
        ) : value ? (
          <ActionIcon onClick={() => setValue('')}>
            <IconBackspace />
          </ActionIcon>
        ) : null
      }
    />
  );
};
