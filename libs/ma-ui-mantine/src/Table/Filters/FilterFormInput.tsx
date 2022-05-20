import { ActionIcon, Group } from '@mantine/core';
import { IconMinus } from '@tabler/icons';
import { cloneElement, FC, ReactElement } from 'react';

export const FilterFormInput: FC<FilterFormInputProps> = (
  props
): ReactElement => {
  const { element, onHide } = props;

  return (
    <Group spacing={6}>
      {!element.props.alwaysOn && (
        <ActionIcon
          onClick={() => onHide()}
          variant="filled"
          radius="xl"
          size="sm"
        >
          <IconMinus size={16} />
        </ActionIcon>
      )}
      {cloneElement(element, {
        minimal: true,
        ...element.props,
      })}
    </Group>
  );
};

export interface FilterFormInputProps {
  element: JSX.Element;
  onHide: () => void;
}
