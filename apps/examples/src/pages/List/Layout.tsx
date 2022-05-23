import {
  List as ListBase,
  Table,
  TextField,
  TextInput,
  CreateButton,
  EditButton,
  PreviewButton,
  BulkDeleteButton,
  SelectInput,
  TextareaInput,
} from '@maesa-admin/ui-mantine';
import { Box, Card, Group } from '@mantine/core';
import { useDataContext } from '../../api/useDataContext';

const createFields = [
  <TextInput label="Name" source="name" />,
  <TextInput label="Username" source="username" defaultValue="ilomon" />,
  <TextInput label="Email" source="email" />,
  <TextInput label="Password" source="password" type="password" />,
  <TextareaInput label="Description" source="description" />,
];

const TableWrapper = (props: any) => {
  return <Card mb="sm" px={0} {...props} />;
};

export const Layout = () => {
  const { getList } = useDataContext();
  const testCallback = async () => {
    throw new Error('Throw error callback');
  };
  return (
    <ListBase
      component={TableWrapper}
      bulkActionButtons={
        <>
          <BulkDeleteButton
            onSubmit={(ids, { refetch }) => {
              console.log(ids);
              refetch();
            }}
          />
        </>
      }
      filters={[
        <TextInput label="Search" source="q" alwaysOn={true} data-filter-field="search" />,
        <SelectInput
          label="Role"
          source="role"
          queryFn={({ pagination }) => {
            const data = getList({
              skip: pagination?.skip,
            });
            return data;
          }}
          choices={(data) => {
            return data.map(({ id, name }) => ({
              value: id,
              label: name,
            }));
          }}
        />,
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
