import React from 'react'
import { useAuth } from '@/features/auth/hooks'
import { Avatar } from 'antd'
import { FiImage } from 'react-icons/fi'

const CreatePost: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-3">
      <Avatar src={user?.avatarUrl} size={40} className="flex-shrink-0">
        {user?.name ? user.name[0].toUpperCase() : 'U'}
      </Avatar>
      <input
        type="text"
        className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 outline-none border-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 cursor-pointer"
        placeholder={`No que você está pensando, ${user?.name?.split(' ')[0] || ''}?`}
        readOnly
      />
      <button
        type="button"
        className="flex items-center gap-2 px-3 py-2 rounded-md bg-transparent hover:bg-green-50 dark:hover:bg-green-900 transition-colors text-green-600 dark:text-green-400 text-sm font-medium cursor-pointer"
      >
        <FiImage className="w-5 h-5" />
        Foto/vídeo
      </button>
    </div>
  )
}

export default CreatePost
