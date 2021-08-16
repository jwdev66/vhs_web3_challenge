import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { injected } from 'utils/web3React'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()

  const login = useCallback(() => {
    activate(injected, (error) => console.log('error=', error))
  }, [activate])

  return { login, logout: deactivate }
}

export default useAuth
