import { Field } from '@/entities';
import { FieldType, CalcType, SortType } from './types';
import { QueryDataDim, QueryDataField, QueryDataQuota } from '@/dtos';

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

export const getFieldSqlArr = (fields: Field[], rename = true) =>
  fields.map((c) =>
    rename ? `\`${c.fieldname}\` AS "${c.name}"` : `\`${c.fieldname}\``,
  );

export const getFieldSqlStr = (fields: Field[], rename = true) =>
  getFieldSqlArr(fields, rename).join(', ');

export const getQuotaSqlArr = (fields: QueryDataQuota[]) =>
  fields.map((f) => {
    switch (f.calc) {
      case CalcType.AVG:
        return `AVG(\`${f.fieldname}\`) AS "${f.name}"`;
      case CalcType.SUM:
        return `SUM(\`${f.fieldname}\`) AS "${f.name}"`;
      case CalcType.COUNT:
        return `COUNT(\`${f.fieldname}\`) AS "${f.name}"`;
      case CalcType.MAX:
        return `MAX(\`${f.fieldname}\`) AS "${f.name}"`;
      case CalcType.MIN:
        return `MIN(\`${f.fieldname}\`) AS "${f.name}"`;
      default:
        return `\`${f.fieldname}\` AS "${f.name}"`;
        break;
    }
  });

export const getOrderArr = (fields: QueryDataDim[]) =>
  fields.map((f) => {
    switch (f.sort) {
      case SortType.DESC:
        return `\`${f.fieldname}\` DESC`;
      case SortType.ASC:
        return `\`${f.fieldname}\` ASC`;
      default:
        return '';
    }
  });

export const transferDto2Sql = (fields: QueryDataField[], rename = true) =>
  fields.map((c) =>
    rename ? `\`${c.fieldname}\` AS "${c.name}"` : `\`${c.fieldname}\``,
  );
