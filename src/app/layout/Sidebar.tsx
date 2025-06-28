import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, useTheme } from '@/hooks'
import { LuHouse, LuSearch, LuBell, LuUser, LuSettings, LuMail, LuLogOut } from 'react-icons/lu'
import { Tooltip } from 'antd'
import { useAuth } from '@/features/auth/hooks'
import logoDark from '@/assets/1.png'
import logoLight from '@/assets/2.png'

const Sidebar: React.FC = () => {
  const { t } = useTranslation()
  const { goTo, isCurrentPath } = useNavigation()
  const { logout } = useAuth()
  const { isDark } = useTheme()

  const menuItems = [
    { icon: LuHouse, label: t('navigation.home'), path: '/' },
    { icon: LuSearch, label: t('navigation.search') },
    { icon: LuBell, label: t('navigation.notifications') },
    { icon: LuMail, label: t('navigation.messages'), path: '/messages' },
    { icon: LuUser, label: t('navigation.profile'), path: '/profile' },
  ]

  return (
    <div className="fixed left-0 top-0 h-screen max-md:w-[244px] w-[335px] p-3 bg-[var(--color-background)] dark:bg-[var(--color-background-dark)] border-r border-gray-200 dark:border-gray-700 flex flex-col z-10">
      <div className="px-3 py-4 mb-4">
        <img
          src={isDark ? logoDark : logoLight}
          alt="Logo DevOrbit"
          className="h-10 cursor-pointer"
          onClick={() => goTo('/')}
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map(item => {
            const active = item.path && isCurrentPath(item.path)
            const handleClick = item.path ? () => goTo(item.path!) : undefined
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={handleClick}
                  className={`flex items-center h-14 w-full px-4 py-3 rounded-lg transition-all duration-200 text-left cursor-pointer
                    ${
                      active
                        ? 'text-blue-600 dark:text-blue-300 font-bold'
                        : 'text-gray-700 dark:text-gray-300'
                    }
                    hover:!bg-gray-100 dark:hover:!bg-gray-800
                  `}
                  disabled={!item.path}
                >
                  <item.icon
                    className={`w-5 h-5 mr-3 ${
                      active
                        ? 'text-blue-600 dark:text-blue-300 font-bold'
                        : 'text-gray-400 dark:text-gray-400 group-hover:text-blue-500'
                    }`}
                    style={{ strokeWidth: active ? 2.5 : 1.5 }}
                  />
                  <span className="text-base">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-medium text-sm">JD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 dark:text-white">João Silva</p>
              <p className="text-xs text-gray-500 dark:text-gray-300">@joaosilva</p>
            </div>
          </div>
          <Tooltip title="Sair">
            <LuLogOut
              className="w-4 h-4 text-gray-400 dark:text-gray-300"
              onClick={() => logout()}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
