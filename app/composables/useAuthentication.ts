export const useAuthentication = () => {
  const { loggedIn, session, user, clear, fetch } = useUserSession()

  const login = async (email: string, password: string) => {
    try {

      await $fetch('/api/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      await fetch()
      navigateTo('/?message=Login successful')

      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const register = async (fullName: string, email: string, password: string) => {
    try {
      await $fetch('/api/auth/login')
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const logout = async () => {
    await clear()
    navigateTo('/')
  }

  return {
    loggedIn,
    session,
    user,
    // Getters
    isLoggedIn: loggedIn,
    isAdmin: computed(() => user.value?.roles.includes('admin')),

    // Methods, actions
    login,
    register,
    logout,
    fetch
  }
}