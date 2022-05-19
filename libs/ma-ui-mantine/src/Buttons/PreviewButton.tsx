import { Identifier } from '@maesa-admin/core';
import { Button, Drawer, DrawerProps } from '@mantine/core';
import { IconEye } from '@tabler/icons';
import { FormikHelpers } from 'formik';
import { ReactElement, ReactNode, useState } from 'react';
import { PreviewForm } from './PreviewForm';

export const PreviewButton = (props: PreviewButtonProps): JSX.Element => {
  const { children, drawer, fields } = props;
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button
        variant="subtle"
        leftIcon={<IconEye size={14} />}
        onClick={() => setOpen((o) => !o)}
      >
        Preview
      </Button>
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
