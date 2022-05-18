import { FC } from "react";
import { Text } from "@mantine/core";
import { useRecordContext } from "@maesa-admin/core";
import get from "lodash/get";
import { PublicFieldProps } from "./types";

export interface TextFieldProps
  extends PublicFieldProps {
  showLabel?: boolean;
}

export const TextField: FC<TextFieldProps> = ({
  label,
  source,
  showLabel = false
}) => {
  const record = useRecordContext();
  const value = get(record, source);
  return (
    <div>
      <Text>{value}</Text>
      {showLabel &&
        <Text size="sm" color="gray">{label}</Text>}
    </div>)
}