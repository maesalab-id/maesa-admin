import { FC } from "react";
import { Avatar } from "@mantine/core";
import { useRecordContext } from "@maesa-admin/core";
import get from "lodash/get";
import { PublicFieldProps } from "./types";

export interface AvatarFieldsProps
  extends PublicFieldProps {
  parseUrl?: (src: string) => string;
}

export const AvatarFields: FC<AvatarFieldsProps> = ({
  source,
  parseUrl = (src) => src
}) => {
  const record = useRecordContext();
  const value = get(record, source);
  const src = parseUrl(value);
  return (
    <div>
      <Avatar src={src} />
    </div>)
}