export type Identifier = string | number;

export interface MaRecord {
  id: Identifier;
  [key: string]: any;
}

export interface FilterPayload {
  [k: string]: any;
}

export interface SortPayload {
  field: string;
  order: string;
}
