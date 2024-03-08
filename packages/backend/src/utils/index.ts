import { RawDatasetFieldType } from './types';

export function mysqlDataTypeToCategory(type: string): RawDatasetFieldType {
  // 数字类型
  const numberTypes = [
    'int',
    'integer',
    'tinyint',
    'smallint',
    'mediumint',
    'bigint',
    'decimal',
    'num',
    'numeric',
    'float',
    'double',
    'bit',
    'real',
  ];
  // 字符串类型
  const stringTypes = [
    'char',
    'varchar',
    'binary',
    'varbinary',
    'blob',
    'text',
    'enum',
    'set',
  ];
  // 日期时间类型
  const dateTypes = ['date', 'datetime', 'timestamp', 'time', 'year'];

  type = type.toLowerCase();

  if (numberTypes.includes(type)) {
    return 'number';
  } else if (stringTypes.includes(type)) {
    return 'string';
  } else if (dateTypes.includes(type)) {
    return 'date';
  } else {
    return 'unknown';
  }
}
