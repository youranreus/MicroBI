import { useUserStore } from '@/stores/user'
import { ENV } from '@/utils'
import { userLogin as userLoginRequest } from '@/api/user'
import { useRequest } from 'alova'

export const useUserLogin = () => {
  const { userLogin, hasLoggedIn } = useUserStore()
  const route = useRoute()
  const router = useRouter()
  const msg = useMessage()

  const { send, data, loading, onSuccess, onError } = useRequest(
    (token: string) => userLoginRequest(token),
    {
      immediate: false
    }
  )

  const redirectLogin = () => {
    window.location.href = `${ENV.SSO_URL}/callback/${ENV.SSO_KEY}`
  }

  const redirectHome = () => router.push('/')

  const login = () => {
    if (!route.query.ticket) {
      msg.error('没有获取到token信息')
      return
    }

    send(String(route.query.ticket))
  }

  onSuccess(() => {
    userLogin(data.value.data.user, data.value.data.token)
    msg.success('登陆成功, 3秒后跳转')
    setTimeout(redirectHome, 3000)
  })

  onError((e) => {
    console.log('🤔 e 是 ', e)
    msg.error(e.error.message)
  })

  return { hasLoggedIn, loading, redirectLogin, login, redirectHome }
}
