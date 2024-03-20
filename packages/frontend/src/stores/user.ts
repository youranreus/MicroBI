import type { UserData } from '@/types/user'

const INIT_USER_DATA: UserData = {
  id: -1,
  avatar: '',
  email: '',
  name: '',
  created_at: '',
  updated_at: ''
}

const useStore = defineStore(
  'user',
  () => {
    const userData = reactive<UserData>(INIT_USER_DATA)
    const router = useRouter()

    const token = ref('')

    const hasLoggedIn = computed(() => userData.id !== -1 && !!token.value)

    const userLogin = (data: UserData, tk: string) => {
      Object.assign(userData, data)
      token.value = tk
    }

    const userLogout = () => {
      Object.assign(userData, INIT_USER_DATA)
      token.value = ''
      router.push({ name: 'user-login' })
    }

    const updateUser = (data: Partial<UserData>) => {
      Object.assign(userData, data)
    }

    return { userData, token, hasLoggedIn, userLogin, userLogout, updateUser }
  },
  {
    persist: {
      key: 'user-store'
    }
  }
)

export const useUserStore = () => {
  const store = useStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
