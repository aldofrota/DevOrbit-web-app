import React, { Suspense } from 'react'
import { ConfigProvider, Spin, theme as antdTheme } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import { useTheme } from '@/hooks'
import { Toaster } from 'react-hot-toast'
import { ApolloProviderWrapper } from '@/providers/ApolloProviderWrapper'

const App: React.FC = () => {
  const { theme } = useTheme()
  const { defaultAlgorithm, darkAlgorithm } = antdTheme

  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: '#6366F1',
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
          <h1>Hello World</h1>
          {/* <RoutesComponents /> */}
        </ApolloProviderWrapper>
        <Toaster position="top-right" />
      </Suspense>
    </ConfigProvider>
  )
}

export default App
