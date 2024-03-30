export enum DataSourceType {
  MYSQL = 'mysql',
  MARIA = 'mariadb',
}

export enum FieldType {
  STRING = 'string',
  NUMBER = 'number',
  DATE = 'date',
}

export enum CalcType {
  AVG = 'AVG',
  SUM = 'SUM',
  COUNT = 'COUNT',
  MAX = 'MAX',
  MIN = 'MIN',
}

export enum SortType {
  NONE = '',
  DESC = 'DESC',
  ASC = 'ASC',
}

export interface Restful<T> {
  code: number;
  msg: string;
  data: T;
}

export interface DatasetFieldCreateItem {
  name: string;
  type: FieldType;
  field_name: string;
}
