import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { setValue } from 'utilities/localStorage'

const Join = () => {
  const { code } = useParams()

  useEffect(() => {
    code && setValue('matchCode', code)
    window.location.href = '/'
  }, [])

  return null
}

export default Join
