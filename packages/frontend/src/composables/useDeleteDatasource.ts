import { type DatasourceMeta } from '@/types/datasource'
import { delDatasource } from '@/api/datasource'

export const useDeleteDatasource = () => {
  const dialog = useDialog()
  const msg = useMessage()

  const del = (data: DatasourceMeta, callback?: () => void) => {
    const d = dialog.warning({
      title: `删除数据源`,
      content: `你确定要删除数据源「${data.name}」吗`,
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
          delDatasource(data.id)
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
