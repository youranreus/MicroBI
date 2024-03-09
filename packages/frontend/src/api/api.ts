import { createAlova } from 'alova'
import VueHook from 'alova/vue'
import { axiosRequestAdapter } from '@alova/adapter-axios'
import { useUserStore } from '@/stores/user'
import { ENV } from '@/utils'

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
    }
  }
})

export default alovaInstance
