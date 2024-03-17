import { type DatasetMeta } from '@/types/dataset'
import { delDataset } from '@/api/dataset'

export const useDeleteDataset = () => {
  const dialog = useDialog()
  const msg = useMessage()

  const del = (data: DatasetMeta, callback?: () => void) => {
    const d = dialog.warning({
      title: `删除数据集`,
      content: `你确定要删除数据集「${data.name}」吗`,
      positiveText: '删除',
      negativeText: '取消',
      positiveButtonProps: {
        secondary: true,
        ghost: false
      },
      negativeButtonProps: {
        secondary: true,
        ghost: false
      },
      onPositiveClick: () => {
        d.loading = true
        return new Promise((rs) => {
          delDataset(data.id)
            .then(() => {
              msg.success('删除成功')
              callback?.()
            })
            .then(rs)
        })
      }
    })
  }

  return { del }
}
