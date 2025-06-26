import React from 'react'

// Páginas públicas
const Login = React.lazy(() => import('@/features/auth/pages/Login'))

// Páginas protegidas
const Feed = React.lazy(() => import('@/features/feed/pages/Feed'))

// Rotas públicas
export const publicRoutes = [{ path: '/login', component: <Login /> }]

// Rotas protegidas
export const authProtectedRoutes = [
  { path: '/', component: <Feed /> },
  { path: '/feed', component: <Feed /> },
]
