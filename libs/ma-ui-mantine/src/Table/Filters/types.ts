import { ReactNode } from "react";

export type CommonInputProps = {
  alwaysOn?: boolean;
  label?: string | ReactNode | null;
  placeholder?: string;
  defaultValue?: string;
}