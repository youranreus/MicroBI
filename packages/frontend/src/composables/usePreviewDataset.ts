import { getDataset, getPreviewData } from '@/api/dataset'
import { useRequest } from 'alova'

export const usePreviewDataset = (id: number) => {
  const msg = useMessage()

  const { loading: metaLoading, data: metaData, onError: onMetaError } = useRequest(getDataset(id))
  const {
    loading: previewLoading,
    data: previewData,
    onError: onPreviewError
  } = useRequest(getPreviewData(id))

  const loading = computed(() => metaLoading.value || previewLoading.value)

  const handleError = () => {
    msg.error('获取预览数据时出现错误')
  }

  onMetaError(handleError)
  onPreviewError(handleError)

  const tableColumn = computed(() => {
    if (!metaData.value?.data) {
      return []
    }

    return metaData.value.data.fields.map((row) => ({
      title: row.name,
      key: row.name,
      ellipsis: {
        tooltip: true
      }
    }))
  })

  const tableData = computed(() => previewData.value?.data || [])

  const tableBindings = computed(() => ({
    columns: tableColumn.value,
    data: tableData.value,
    loading: loading.value
  }))

  return { loading, metaData, previewData, tableColumn, tableData, tableBindings }
}
