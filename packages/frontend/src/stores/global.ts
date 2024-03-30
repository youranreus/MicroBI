import { darkTheme } from 'naive-ui'

const useStore = defineStore(
  'global',
  () => {
    const isDarkMode = ref(false)

    const toggleDarkMode = (val?: boolean) => {
      isDarkMode.value = val ?? !isDarkMode.value
    }

    const currentTheme = computed(() => (isDarkMode.value ? darkTheme : undefined))

    return { isDarkMode, currentTheme, toggleDarkMode }
  },
  {
    persist: {
      key: 'global-store'
    }
  }
)

export const useGlobalStore = () => {
  const store = useStore()

  return {
    ...store,
    ...storeToRefs(store)
  }
}
