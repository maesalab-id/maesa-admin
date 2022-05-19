import { ActionIcon, Drawer, DrawerProps, Tooltip } from '@mantine/core';
import { IconEye } from '@tabler/icons';
import { ReactElement, ReactNode, useState } from 'react';
import { PreviewForm } from './PreviewForm';

export const PreviewButton = (props: PreviewButtonProps): JSX.Element => {
  const { children, drawer, fields } = props;
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Tooltip label="Preview" position="left" withArrow={true}>
        <ActionIcon
          color="primary"
          size="lg"
          onClick={() => setOpen((o) => !o)}
        >
          <IconEye size={14} />
        </ActionIcon>
      </Tooltip>
      <Drawer
        {...drawer}
        title={'Preview'}
        padding={'xl'}
        size="xl"
        opened={isOpen}
        onClose={() => setOpen(false)}
      >
        {isOpen && <PreviewForm fields={fields}>{children}</PreviewForm>}
      </Drawer>
    </>
  );
};

export interface PreviewButtonProps<T = { [key: string]: any }> {
  drawer?: DrawerProps;
  fields?: ReactElement[];
  children?: ReactNode;
}
