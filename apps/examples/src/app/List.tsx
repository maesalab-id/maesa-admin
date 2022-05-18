import {
  List as ListBase,
  Table,
  TextField,
  TextInput,
} from '@maesa-admin/ui-mantine';

export const List = () => {
  return (
    <ListBase
      filters={[
        <TextInput label="Search" source="q" alwaysOn={true} />,
        <TextInput label="Id" source="id" />,
      ]}
      queryFn={() => {
        const data = [
          {
            id: 1,
            name: 'Foo',
          },
          {
            id: 2,
            name: 'Bar',
          },
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
      </Table>
    </ListBase>
  );
};
