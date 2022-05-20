export type Identifier = string | number;

export interface MaRecord {
  id: Identifier;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export interface FilterPayload {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k: string]: any;
}

export interface SortPayload {
  field: string;
  order: string;
}

export interface GetListResult<RecordType extends MaRecord = any> {
  data: RecordType[];
  total: number;
  skip: number;
  limit: number;
}
