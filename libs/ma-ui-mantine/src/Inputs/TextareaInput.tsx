import { ActionIcon, Loader, Textarea } from '@mantine/core';
import { HTMLInputTypeAttribute, InputHTMLAttributes, useMemo } from 'react';
import { IconBackspace } from '@tabler/icons';
import { CommonInputProps } from '../Table/Filters/types';
import { useField } from 'formik';

interface TextInputProps extends CommonInputProps {
  minimal?: boolean;
  source?: string;
  isLoading?: boolean;
}

export const TextareaInput = (props: TextInputProps): JSX.Element => {
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
    <Textarea
      autosize={true}
      label={!minimal && label}
      placeholder={placeholder}
      value={value || ''}
      onChange={(e) => {
        const value = e.target.value;
        setValue(value);
      }}
      minRows={2}
      rightSection={isLoading ? <Loader size="sm" /> : null}
      {...rest}
    />
  );
};
