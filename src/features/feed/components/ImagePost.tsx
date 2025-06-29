import React from 'react'
import { Avatar, Image } from 'antd'
import { FiThumbsUp, FiMessageCircle, FiSend } from 'react-icons/fi'

interface ImagePostProps {
  user?: {
    name: string
    avatarUrl?: string
  }
  date?: string
  text?: string
  imageUrl: string
  likes?: number
  comments?: number
  shares?: number
}

const ImagePost: React.FC<ImagePostProps> = ({
  user = { name: 'Usuário', avatarUrl: '' },
  date = 'Agora mesmo',
  text = '',
  imageUrl,
  likes = 0,
  comments = 0,
  shares = 0,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-3">
          <Avatar src={user.avatarUrl} size={36}>
            {user.name[0].toUpperCase()}
          </Avatar>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white text-sm">{user.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{date}</div>
          </div>
        </div>
      </div>
      {text && <div className="px-4 pb-2 text-gray-900 dark:text-gray-100 text-base">{text}</div>}
      <div className="w-full flex justify-center bg-black/5 dark:bg-white/5">
        <Image
          src={imageUrl}
          alt="Post"
          className="max-h-[500px] w-auto object-contain cursor-pointer"
          preview={{ mask: null }}
        />
      </div>
      <div className="flex items-center justify-between px-4 pt-2 pb-1 text-xs text-gray-500 dark:text-gray-400">
        <span>{likes} curtidas</span>
        <span>
          {comments} comentários · {shares} compartilhamentos
        </span>
      </div>
      <div className="flex items-center justify-between px-2 py-1 border-t border-gray-100 dark:border-gray-700">
        <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
          <FiThumbsUp /> Curtir
        </button>
        <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
          <FiMessageCircle /> Comentar
        </button>
        <button className="flex items-center gap-2 flex-1 justify-center py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300">
          <FiSend /> Enviar
        </button>
      </div>
    </div>
  )
}

export default ImagePost
