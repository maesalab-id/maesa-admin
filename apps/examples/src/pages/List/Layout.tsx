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
import { useMemo } from 'react';
import { useDataContext } from '../../api/useDataContext';
import toString from 'lodash/toString';

const TableWrapper = (props: any) => {
  return <Card mb="sm" px={0} {...props} />;
};

export const Layout = () => {
  const { getList } = useDataContext();
  const testCallback = async () => {
    throw new Error('Throw error callback');
  };

  const createFields = useMemo(
    () => [
      <TextInput label="Name" source="name" />,
      <TextInput label="Username" source="username" defaultValue="ilomon" />,
      <TextInput label="Email" source="email" />,
      <TextInput label="Password" source="password" type="password" />,
      <TextareaInput label="Description" source="description" />,
      <SelectInput
        label="Role"
        source="role_id"
        queryFn={({ pagination }) => {
          const data = getList('roles', {
            limit: 100,
            page: pagination?.skip,
          });
          return data;
        }}
        choices={(data) => {
          return data.map(({ id, name }) => ({
            value: toString(id),
            label: name,
          }));
        }}
      />,
      <SelectInput
        label="Company"
        source="company_id"
        queryFn={({ pagination }) => {
          const data = getList('companies', {
            limit: 100,
            page: pagination?.skip,
          });
          return data;
        }}
        choices={(data) => {
          return data.map(({ id, name }) => ({
            value: toString(id),
            label: name,
          }));
        }}
      />,
    ],
    []
  );
  return (
    <ListBase
      component={TableWrapper}
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
          queryFn={({ pagination }) => {
            const data = getList('roles', {
              page: pagination?.skip,
            });
            return data;
          }}
          choices={(data) => {
            return data.map(({ id, name }) => ({
              value: toString(id),
              label: name,
            }));
          }}
        />,
        <SelectInput
          label="Company"
          source="company_id"
          queryFn={({ pagination }) => {
            const data = getList('companies', {
              page: pagination?.skip,
            });
            return data;
          }}
          choices={(data) => {
            return data.map(({ id, name }) => ({
              value: toString(id),
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
      queryFn={async ({ pagination, filter }) => {
        const data = await getList('people', {
          page: pagination?.page,
          query: {
            company_id: filter?.['company_id'],
          },
        });
        return {
          limit: data.limit,
          total: data.total,
          skip: data.skip,
          data: data.data as any,
        };
      }}
    >
      <Table expand={<div>COBA</div>}>
        <TextField label="Id" source="id" />
        <TextField label={'Name'} source="name" />
        <TextField label={'Email'} source="email" />
        <TextField label={'Company'} source="company.name" />
        <TextField label={'Role'} source="role.name" />
        <Box sx={{ justifyContent: 'right', display: 'flex' }}>
          <EditButton
            fields={createFields}
            onSubmit={async (id, values) => {
              console.log(values);
              await testCallback();
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
