import { getFieldList } from '@/api/dataset'
import { useWatcher } from 'alova'

export const useDatasetFields = (
  id: ComputedRef<number | undefined> | Ref<number | undefined>,
  callback?: () => void
) => {
  const { data, loading, onSuccess } = useWatcher(() => getFieldList(id.value as number), [id], {
    sendable: () => {
      return typeof id.value !== 'undefined'
    },
    immediate: true
  })

  onSuccess(() => {
    callback?.()
  })

  return { data, loading }
}
