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
  AvatarFields,
} from '@maesa-admin/ui-mantine';
import { Box, Card, Group } from '@mantine/core';
import { useDataContext } from '../../api/useDataContext';
import { ListCreate, ListCreateSchema } from './ListCreate';
import { ListEdit, ListEditSchema } from './ListEdit';
import { omitBy, isNil } from 'lodash';

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
        <TextInput
          label="Search"
          source="q"
          alwaysOn={true}
          data-filter-field="search"
        />,
        <SelectInput
          label="Role"
          source="role"
          queryFn={async ({ filter, pagination }) => {
            const data = await getList('roles', {
              page: pagination?.page,
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
            initialValues={{
              name: '',
              username: '',
              email: '',
              password: '',
              description: '',
            }}
            validationSchema={ListCreateSchema}
            onSubmit={async (values) => {
              console.log(values);
              await testCallback();
            }}
          >
            <ListCreate />
          </CreateButton>
        </Group>
      )}
      queryFn={async ({ filter, pagination }) => {
        let query: any = {
          role_id: filter['role'],
        };
        query = omitBy(query, isNil);
        const data = await getList('people', {
          filter: query,
          page: pagination?.page,
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
        <AvatarFields label={'Avatar'} source="avatar" />
        <TextField label={'Name'} source="name" />
        <TextField label={'Email'} source="email" />
        <TextField label={'Role'} source="role.name" />
        <Box sx={{ justifyContent: 'right', display: 'flex' }}>
          <EditButton
            validationSchema={ListEditSchema}
            onSubmit={async (id, values) => {
              await testCallback();
            }}
          >
            <ListEdit />
          </EditButton>
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
