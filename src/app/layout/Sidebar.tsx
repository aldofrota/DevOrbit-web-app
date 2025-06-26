import React from 'react'
import { useTranslation } from 'react-i18next'

export const Sidebar: React.FC = () => {
  const { t } = useTranslation()

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{t('sidebar.title')}</h2>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>🏠</span>
                <span className="ml-3">{t('navigation.home')}</span>
              </a>
            </li>
            <li>
              <a
                href="/feed"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>📰</span>
                <span className="ml-3">{t('navigation.feed')}</span>
              </a>
            </li>
            <li>
              <a
                href="/profile"
                className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <span>👤</span>
                <span className="ml-3">{t('navigation.profile')}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
