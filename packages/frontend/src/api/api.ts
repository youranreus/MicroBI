import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import { axiosRequestAdapter } from '@alova/adapter-axios'
import { useUserStore } from '@/stores/user'
import { ENV } from '@/utils'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import _axios from 'axios'

const alovaInstance = createAlova({
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter(),
  baseURL: ENV.API,
  beforeRequest(method) {
    const { token } = useUserStore()

    if (token.value) {
      method.config.headers.Authorization = `Bearer ${token.value}`
    }
  },
  responded: {
    onSuccess: (res) => {
      return res.data
    },
    onError: (e) => {
      if (e.response.data.code === 30001) {
        throw new Error('无权限')
      }

      throw new Error(e?.response?.data?.msg || e)
    }
  },
  localCache: null
})

export default alovaInstance
