import { TextareaInput, TextInput } from '@maesa-admin/ui-mantine';
import { Group, Stack } from '@mantine/core';

export const ListCreate = () => {
  return (
    <Stack>
      <TextInput label="Name" source="name" />
      <Group grow={true}>
        <TextInput label="Username" source="username" defaultValue="ilomon" />
        <TextInput label="Email" source="email" />
      </Group>
      <TextInput label="Password" source="password" type="password" />
      <TextareaInput label="Description" source="description" />
    </Stack>
  );
};
