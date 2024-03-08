import { FieldType } from './types';

export function mysqlDataTypeToCategory(type: string): FieldType | 'unknown' {
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
    return FieldType.NUMBER;
  } else if (stringTypes.includes(type)) {
    return FieldType.STRING;
  } else if (dateTypes.includes(type)) {
    return FieldType.DATE;
  } else {
    return 'unknown';
  }
}
