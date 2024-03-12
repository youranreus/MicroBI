import type { RouteLocationNormalized } from 'vue-router'
import { NAV_VALUE_LIST, MENU_ITEMS_MAP } from '@/utils/constants'

const useStore = defineStore(
  'menu',
  () => {
    const currentNav = ref('')
    const currentMenu = ref('')

    const currentMenuList = computed(() => {
      return MENU_ITEMS_MAP[currentNav.value] || []
    })

    const updateNav = (val: string) => (currentNav.value = val)

    const updateMenu = (val: string) => (currentMenu.value = val)

    const handleRouteChange = (to: RouteLocationNormalized) => {
      updateNav('')
      updateMenu('')
      for (const match of to.matched) {
        if (NAV_VALUE_LIST.includes(match.name as string)) {
          updateNav(match.name as string)
        } else if (currentMenuList.value.some((i) => i.key === match.name)) {
          updateMenu(match.name as string)
          break
        }
      }
    }

    return { currentNav, currentMenu, currentMenuList, updateNav, updateMenu, handleRouteChange }
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
