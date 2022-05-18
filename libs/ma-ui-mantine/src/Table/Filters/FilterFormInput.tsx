import { ActionIcon, Group } from "@mantine/core";
import { IconCircleMinus } from "@tabler/icons";
import { cloneElement, FC, ReactElement } from "react";

export const FilterFormInput: FC<FilterFormInputProps> = (props): ReactElement => {
  const {
    element,
    onHide,
  } = props;

  return (
    <Group spacing={"xs"}>
      {!element.props.alwaysOn &&
        <ActionIcon
          onClick={() => onHide()}
          variant="filled"
          radius="xl"
        >
          <IconCircleMinus size={16} />
        </ActionIcon>}
      {cloneElement(element)}
    </Group>
  )
}

export interface FilterFormInputProps {
  element: JSX.Element;
  onHide: () => void;
}