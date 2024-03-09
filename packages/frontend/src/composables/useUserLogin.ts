import { useUserStore } from '@/stores/user'
import { ENV } from '@/utils'

export const useUserLogin = () => {
  const { loginVisible, hasLoggedIn } = useUserStore()
  const router = useRouter()

  const redirectLogin = () => {
    window.location.href = `${ENV.SSO_URL}/callback/${ENV.SSO_KEY}`
  }

  const showLoginDialog = () => (loginVisible.value = true)

  onMounted(() => {
    if (!hasLoggedIn.value) {
      router.push({ name: 'login-required' })
      showLoginDialog()
    }
  })

  return { loginVisible, redirectLogin }
}
