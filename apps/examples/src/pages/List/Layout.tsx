import {
  List as ListBase,
  Table,
  TextField,
  TextInput,
  CreateButton,
  EditButton,
  PreviewButton,
  BulkDeleteButton,
} from '@maesa-admin/ui-mantine';
import { Box, Group } from '@mantine/core';
import { useDataContext } from '../../api/useDataContext';

const createFields = [
  <TextInput label="Name" source="name" />,
  <TextInput label="Username" source="username" defaultValue="ilomon" />,
  <TextInput label="Email" source="email" />,
  <TextInput label="Password" source="password" />,
];

export const Layout = () => {
  const { getList } = useDataContext();
  const testCallback = async () => {
    throw new Error('Throw error callback');
  };
  return (
    <ListBase
      bulkActionButtons={
        <>
          <BulkDeleteButton
            onSubmit={(ids) => {
              console.log(ids);
            }}
          />
        </>
      }
      filters={[
        <TextInput label="Search" source="q" alwaysOn={true} />,
        <TextInput label="Id" source="id" />,
      ]}
      actions={() => (
        <Group>
          <CreateButton
            fields={createFields}
            onSubmit={async (values) => {
              console.log(values);
              await testCallback();
            }}
          />
        </Group>
      )}
      queryFn={({ pagination }) => {
        const data = getList({
          skip: pagination?.skip,
        });
        return {
          limit: data.limit,
          total: data.total,
          skip: data.skip,
          data: data.data as any,
        };
      }}
    >
      <Table>
        <TextField label="Id" source="id" />
        <TextField label={'Name'} source="name" />
        <TextField label={'Email'} source="email" />
        <Box sx={{ justifyContent: 'right', display: 'flex' }}>
          <EditButton fields={createFields} onSubmit={testCallback} />
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
