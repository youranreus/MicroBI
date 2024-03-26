export enum FieldType {
  STRING = 'string',
  DATE = 'date',
  NUMBER = 'number'
}

export interface Field {
  id: number
  name: string
  type: FieldType
  fieldname: string
  dataset: number
  workspace?: number
}

export enum AnalyzeType {
  QUOTA = 'quota',
  DIM = 'dim',
  FILTER = 'filter'
}
