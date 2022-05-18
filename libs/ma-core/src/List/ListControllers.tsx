import { ListControllerProps, ListControllerResult, useListController } from "./useListController"

export const ListController = ({
  children,
  ...props
}: {
  children: (params: ListControllerResult) => JSX.Element;
} & ListControllerProps) => {
  const controllerProps = useListController(props);
  return children(controllerProps);
}