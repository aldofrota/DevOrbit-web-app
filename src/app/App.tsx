import React, { Suspense } from 'react'
import { ConfigProvider, Spin, theme as antdTheme } from 'antd'
import ptBR from 'antd/es/locale/pt_BR'
import { useTheme } from '@/hooks'

const App: React.FC = () => {
  const { theme } = useTheme()
  const { defaultAlgorithm, darkAlgorithm } = antdTheme

  return (
    <ConfigProvider
      locale={ptBR}
      theme={{
        algorithm: theme === 'dark' ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: '#08d9d6',
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
        {/* <RoutesComponents /> */}
      </Suspense>
    </ConfigProvider>
  )
}

export default App
