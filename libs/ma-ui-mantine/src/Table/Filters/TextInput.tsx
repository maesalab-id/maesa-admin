import { ActionIcon, Loader, TextInput as MtTextInput } from '@mantine/core';
import { useMemo, useState } from 'react';
import { IconBackspace } from '@tabler/icons';
import { CommonInputProps } from './types';
import { useField } from 'formik';
import { rest } from 'lodash';

interface TextInputProps extends CommonInputProps {
  minimal?: boolean;
  source?: string;
  isLoading?: boolean;
}

export const TextInput = (props: TextInputProps): JSX.Element => {
  const {
    label,
    minimal = false,
    placeholder: initialPlaceholder,
    isLoading = false,
    source = 'q',
    defaultValue,
    alwaysOn,
    ...rest
  } = props;

  const [{ value }, meta, { setValue }] = useField({
    name: source,
  });

  const placeholder = useMemo<string>((): string => {
    let l = label;
    if (typeof l !== 'string') l = undefined;
    if (!minimal) l = undefined;
    return initialPlaceholder || l || source;
  }, [initialPlaceholder, label, minimal]);

  return (
    <MtTextInput
      label={!minimal && label}
      placeholder={placeholder}
      value={value || undefined}
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
      {...rest}
    />
  );
};
