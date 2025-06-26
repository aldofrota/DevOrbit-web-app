import React from 'react'
import { Layout as AntLayout, theme } from 'antd'
import { useTheme } from '@/hooks'

const { Content } = AntLayout

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme()

  const handleToggleMode = () => {
    toggleTheme()
  }

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      {/* <Header darkMode={isDark} handleToggleMode={handleToggleMode} /> */}
      <Content style={{ display: 'flex' }}>{children}</Content>
    </AntLayout>
  )
}

export default Layout
