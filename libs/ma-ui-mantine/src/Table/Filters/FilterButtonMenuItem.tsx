import { MenuItem } from "@mantine/core";
import { FC, ReactElement, useCallback } from "react";

export const FilterButtonMenuItem: FC<FilterButtonMenuItemProps> = (props) => {
  const {
    filter,
    onShow
  } = props;

  const handleShow = useCallback(() => {
    onShow({
      source: filter.props.source,
      defaultValue: filter.props.defaultValue
    })
  }, [filter, onShow]);

  return (
    <MenuItem
      onClick={() => handleShow()}
    >
      {filter.props.label || filter.props.source}
    </MenuItem>
  )
}

export interface FilterButtonMenuItemProps {
  filter: ReactElement;
  onShow: (params: { source: string; defaultValue: any }) => void;
}