import type { RouteLocationNormalized } from 'vue-router'
import { NAV_VALUE_LIST } from '@/utils/constants'

const useStore = defineStore(
  'menu',
  () => {
    const currentNav = ref('')

    const updateNav = (val: string) => (currentNav.value = val)

    const handleRouteChange = (to: RouteLocationNormalized) => {
      updateNav('')
      for (const match of to.matched) {
        if (NAV_VALUE_LIST.includes(match.name as string)) {
          updateNav(match.name as string)
          break
        }
      }
    }

    return { currentNav, updateNav, handleRouteChange }
  },
  {
    persist: {
      key: 'menu-store'
    }
  }
)

export const useMenuStore = () => {
  const store = useStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
