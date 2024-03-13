import { type DatasourceConnection, DatasourceType } from '@/types/datasource'

export const useCreateDatasource = () => {
  const connection = ref<DatasourceConnection>({
    ip: '',
    port: 3306,
    user: '',
    password: '',
    database: '',
    type: DatasourceType.MYSQL
  })

  const name = ref('')

  const bindings = computed(() => {
    const keys = Object.keys(connection.value)

    const allBindings = keys.reduce(
      (p, c) => {
        return {
          ...p,
          [c]: {
            value: connection.value[c as keyof DatasourceConnection],
            'on-update:value': (val: any) => {
              Object.assign(connection.value, {
                [c]: val
              })
            }
          }
        }
      },
      {} as Record<keyof DatasourceConnection | 'name', Record<string, any>>
    )

    allBindings.name = {
      value: name.value,
      'on-update:value': (val: string) => (name.value = val)
    }

    return allBindings
  })

  return { connection, bindings }
}
