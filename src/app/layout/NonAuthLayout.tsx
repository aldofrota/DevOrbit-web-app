import React from 'react'
import { Layout } from 'antd'

const { Content } = Layout

interface NonAuthLayoutProps {
  children: React.ReactNode
}

const NonAuthLayout: React.FC<NonAuthLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>{children}</Content>
    </Layout>
  )
}

export default NonAuthLayout
