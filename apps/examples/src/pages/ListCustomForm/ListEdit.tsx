import { SelectInput, TextareaInput, TextInput } from '@maesa-admin/ui-mantine';
import { Group, Stack } from '@mantine/core';
import * as Yup from 'yup';
import { getList } from '../../api/getList';
import { isNil, omit, omitBy, toString } from 'lodash';

export const ListEditSchema = Yup.object().shape({
  name: Yup.string().required(),
  username: Yup.string().required(),
  email: Yup.string().required(),
  password: Yup.string().required(),
  'confirm-password': Yup.string()
    .oneOf([Yup.ref('password'), null])
    .required(),
  description: Yup.string(),
});

export const ListEdit = () => {
  return (
    <Stack>
      <TextInput label="Name" source="name" />
      <Group grow={true} align="start">
        <TextInput label="Username" source="username" defaultValue="ilomon" />
        <TextInput label="Email" source="email" />
      </Group>
      <Group grow={true} align="start">
        <TextInput label="Password" source="password" type="password" />
        <TextInput
          label="Confirm Password"
          source="confirm-password"
          type="password"
        />
      </Group>
      <TextareaInput label="Description" source="description" />
      <SelectInput
        label="Role"
        source="role_id"
        queryFn={async ({ filter, pagination }) => {
          let query: any = {
            name: filter['query'],
          };
          query = omitBy(query, isNil);
          const data = await getList('roles', {
            filter: query,
            page: pagination?.page,
          });
          return data;
        }}
        choices={(data) => {
          return data.map(({ id, name }) => ({
            value: toString(id),
            label: name,
          }));
        }}
      />
    </Stack>
  );
};
