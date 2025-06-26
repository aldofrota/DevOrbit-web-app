import React, { Suspense } from 'react'
import { ConfigProvider, Spin, theme as antdTheme } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import { useTheme } from '@/hooks'
import { Toaster } from 'react-hot-toast'
import { ApolloProviderWrapper } from '@/providers/ApolloProviderWrapper'
import { I18nProvider } from '@/providers/I18nProvider'
import RoutesComponents from '@/app/routes'

const App: React.FC = () => {
  const { theme } = useTheme()
  const { defaultAlgorithm, darkAlgorithm } = antdTheme

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
          <ApolloProviderWrapper>
            <RoutesComponents />
          </ApolloProviderWrapper>
          <Toaster position="top-right" />
        </Suspense>
      </ConfigProvider>
    </I18nProvider>
  )
}

export default App
