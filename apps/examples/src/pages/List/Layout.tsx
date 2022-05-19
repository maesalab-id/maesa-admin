import {
  List as ListBase,
  Table,
  TextField,
  TextInput,
  CreateButton,
  EditButton,
  PreviewButton,
} from '@maesa-admin/ui-mantine';
import { Box } from '@mantine/core';

const createFields = [
  <TextInput label="Name" source="name" />,
  <TextInput label="Username" source="username" defaultValue="ilomon" />,
  <TextInput label="Email" source="email" />,
  <TextInput label="Password" source="password" />,
];

export const Layout = () => {
  return (
    <ListBase
      filters={[
        <TextInput label="Search" source="q" alwaysOn={true} />,
        <TextInput label="Id" source="id" />,
      ]}
      actions={
        <CreateButton
          fields={createFields}
          onSubmit={(values) => {
            console.log(values);
            throw new Error('unknown');
          }}
        />
      }
      queryFn={() => {
        const data = [
          { id: 1, name: 'Foo' },
          { id: 2, name: 'Bar' },
        ];
        return {
          limit: 0,
          total: 0,
          skip: 0,
          data: data as any,
        };
      }}
    >
      <Table>
        <TextField label="Id" source="id" />
        <TextField label={'Name'} source="name" />
        <Box sx={{ justifyContent: 'right', display: 'flex' }}>
          <EditButton
            fields={createFields}
            onSubmit={(id, values) => {
              console.log(id, values);
              throw new Error(`ERROR ${id}`);
            }}
          />
          <PreviewButton
            fields={[
              <TextField label="Id" source="id" />,
              <TextField label="Name" source="name" />,
            ]}
          />
        </Box>
      </Table>
    </ListBase>
  );
};
