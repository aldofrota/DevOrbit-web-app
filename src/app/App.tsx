import React, { Suspense, useEffect } from 'react'
import { ConfigProvider, Spin, theme as antdTheme } from 'antd'
import NProgress from 'nprogress'
import ptBR from 'antd/es/locale/pt_BR'
import { useTheme } from '@/hooks'
import { Toaster } from 'react-hot-toast'
import { I18nProvider } from '@/providers/I18nProvider'
import RoutesComponents from '@/app/routes'
import { useLocation } from 'react-router-dom'

const App: React.FC = () => {
  const { theme } = useTheme()
  const { defaultAlgorithm, darkAlgorithm } = antdTheme

  const location = useLocation()

  useEffect(() => {
    NProgress.start()
    NProgress.done()
  }, [location.pathname])

  return (
    <I18nProvider>
      <ConfigProvider
        locale={ptBR}
        theme={{
          algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary: '#2563eb',
          },
        }}
      >
        <Suspense
          fallback={
            <Spin
              size="large"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            />
          }
        >
          <RoutesComponents />
          <Toaster position="top-right" />
        </Suspense>
      </ConfigProvider>
    </I18nProvider>
  )
}

export default App
