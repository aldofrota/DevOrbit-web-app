import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation, useTheme } from '@/hooks'
import {
  LuHouse,
  LuSearch,
  LuBell,
  LuUser,
  LuSettings,
  LuLogOut,
  LuSun,
  LuMoon,
} from 'react-icons/lu'
import { LiaLanguageSolid } from 'react-icons/lia'
import { IoChatbubblesOutline } from 'react-icons/io5'
import { MdMenuOpen } from 'react-icons/md'
import { Dropdown, type MenuProps, Avatar } from 'antd'
import { useAuth } from '@/features/auth/hooks'
import logoDark from '@/assets/1.png'
import logoLight from '@/assets/2.png'
import { LanguageSelector } from '@/components'

const Sidebar: React.FC = () => {
  const { t } = useTranslation()
  const { goTo, isCurrentPath } = useNavigation()
  const { logout, user } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const getInitials = (name: string) => {
    const names = name.split(' ')
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase()
    }
    return name[0]?.toUpperCase() || 'U'
  }

  const menuItems = [
    { icon: LuHouse, label: t('navigation.home'), path: '/' },
    { icon: LuSearch, label: t('navigation.search') },
    { icon: LuBell, label: t('navigation.notifications') },
    { icon: IoChatbubblesOutline, label: t('navigation.messages'), path: '/messages' },
    {
      icon: LuUser,
      label: t('navigation.profile'),
      path: '/profile',
      customContent: (active: boolean) => (
        <div className="flex items-center">
          <Avatar
            src={user?.avatarUrl}
            size={24}
            className="mr-3"
            style={{ backgroundColor: '#3b82f6' }}
          >
            {user ? getInitials(user.name) : 'U'}
          </Avatar>
          <span className={`text-sm ${active ? 'font-bold' : ''}`}>{t('navigation.profile')}</span>
        </div>
      ),
    },
  ]

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'settings',
      label: (
        <div className="flex items-center gap-2 h-11 w-full text-sm">
          <LuSettings className="w-5 h-5" />
          <span>{isDark ? 'Configurações' : 'Configurações'}</span>
        </div>
      ),
      onClick: e => {
        e.domEvent.stopPropagation()
        goTo('/settings')
      },
    },
    {
      key: 'language',
      label: (
        <div
          className="flex items-center gap-2 h-11 w-full text-sm"
          onClick={e => e.stopPropagation()}
          onMouseDown={e => e.stopPropagation()}
        >
          <LiaLanguageSolid className="w-5 h-5" />
          <LanguageSelector />
        </div>
      ),
      onClick: e => {
        e.domEvent.stopPropagation()
      },
    },
    {
      key: 'theme',
      label: (
        <div className="flex items-center gap-2 h-11 w-full text-sm">
          <span>{isDark ? <LuSun className="w-5 h-5" /> : <LuMoon className="w-5 h-5" />}</span>
          <span>{isDark ? 'Claro' : 'Escuro'}</span>
        </div>
      ),
      onClick: e => {
        e.domEvent.stopPropagation()
        toggleTheme()
      },
    },
    {
      key: 'divider',
      type: 'divider',
    },
    {
      key: 'logout',
      label: (
        <div className="flex items-center gap-2 h-11 w-full text-sm">
          <LuLogOut className="w-5 h-5" />
          <span>Sair</span>
        </div>
      ),
      onClick: e => {
        e.domEvent.stopPropagation()
        logout()
      },
    },
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
                  {item.customContent ? (
                    item.customContent(Boolean(active))
                  ) : (
                    <>
                      <item.icon
                        className={`w-5 h-5 mr-3 ${
                          active
                            ? 'text-blue-600 dark:text-blue-300 font-bold'
                            : 'text-gray-400 dark:text-gray-400 group-hover:text-blue-500'
                        }`}
                        style={{ strokeWidth: active ? 2.5 : 1.5 }}
                      />
                      <span className="text-base">{item.label}</span>
                    </>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <Dropdown
        menu={{
          items: dropdownItems,
          style: {
            backgroundColor: isDark ? 'var(--color-background-dark)' : 'var(--color-background)',
            boxShadow: '0 10px 10px 0 rgba(0, 0, 0, 0.1)',
            border: `1px solid var(${isDark ? '--color-border-dark' : '--color-border'})`,
            width: '266px',
            borderRadius: '8px',
            padding: '8px',
          },
        }}
        placement="topRight"
        trigger={['click']}
        autoAdjustOverflow={false}
        destroyOnHidden={false}
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        autoFocus={false}
      >
        <button className="flex items-center h-14 w-full px-4 py-3 rounded-lg transition-all duration-200 text-left cursor-pointer text-gray-700 dark:text-gray-300 hover:!bg-gray-100 dark:hover:!bg-gray-800">
          <MdMenuOpen className="w-5 h-5 mr-3 " />
          <span className="text-base">{t('navigation.more')}</span>
        </button>
      </Dropdown>
    </div>
  )
}

export default Sidebar
