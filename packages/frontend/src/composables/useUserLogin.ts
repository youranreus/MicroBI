import { useUserStore } from '@/stores/user'
import { ENV } from '@/utils'

export const useUserLogin = () => {
  const { loginVisible } = useUserStore()

  const redirectLogin = () => {
    window.location.href = `${ENV.SSO_URL}/callback/${ENV.SSO_KEY}`
  }

  const showLoginDialog = () => (loginVisible.value = true)

  return { loginVisible, redirectLogin, showLoginDialog }
}
