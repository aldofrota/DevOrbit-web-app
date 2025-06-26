import React from 'react'
import { Layout as AntLayout } from 'antd'
import Sidebar from '@/app/layout/Sidebar'

const { Content } = AntLayout

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AntLayout className="min-h-screen overflow-hidden" hasSider>
      <Sidebar />

      <AntLayout className="relative flex-1 overflow-auto max-h-screen">
        <Content className="flex">{children}</Content>
      </AntLayout>
    </AntLayout>
  )
}

export default Layout
