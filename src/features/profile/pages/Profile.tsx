import { useNavigation } from '@/hooks'
import React from 'react'

const Profile: React.FC = () => {
  const { getParams } = useNavigation()

  return (
    <div>
      <h1>Perfil do usuário: {getParams().username}</h1>
      <p>Username capturado da URL: {getParams().username}</p>
    </div>
  )
}

export default Profile
