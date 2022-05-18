import { ReactElement } from "react";

export type CommonInputProps = {
  alwaysOn?: boolean;
  label?: string | ReactElement | null;
  placeholder?: string;
}