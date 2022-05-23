import {
  ActionIcon,
  Loader,
  TextInput as MtTextInput,
  PasswordInput as MtPasswordInput,
  DefaultProps,
  TextInputStylesNames,
} from '@mantine/core';
import { HTMLInputTypeAttribute, InputHTMLAttributes, useMemo } from 'react';
import { IconBackspace, IconMinus } from '@tabler/icons';
import { CommonInputProps } from '../Table/Filters/types';
import { useField } from 'formik';

interface TextInputProps extends DefaultProps<TextInputStylesNames>, CommonInputProps {
  minimal?: boolean;
  source?: string;
  isLoading?: boolean;
  type?:
    | 'number'
    | 'email'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | undefined;
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

  const conditionalProps = {
    value: value || '',
    type: rest.type,
  };

  const InputComponent =
    rest.type === 'password' ? MtPasswordInput : MtTextInput;

  if (rest.type === 'password') {
    conditionalProps.type = undefined;
    conditionalProps.value = undefined;
  }

  return (
    <InputComponent
      label={!minimal && label}
      placeholder={placeholder}
      onChange={(e) => {
        const value = e.target.value;
        setValue(value);
      }}
      rightSection={
        isLoading ? (
          <Loader size="sm" />
        ) : value ? (
          <ActionIcon tabIndex={-1} onClick={() => setValue('')}>
            <IconBackspace />
          </ActionIcon>
        ) : null
      }
      {...rest}
      {...conditionalProps}
    />
  );
};
