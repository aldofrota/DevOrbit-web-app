import React from 'react'

// Public pages
const Login = React.lazy(() => import('@/features/auth/pages/Login'))

// Protected pages
const Feed = React.lazy(() => import('@/features/feed/pages/Feed'))
const Profile = React.lazy(() => import('@/features/profile/pages/Profile'))

// Public routes
export const publicRoutes = [{ path: '/login', component: <Login /> }]

// Protected routes
export const authProtectedRoutes = [
  { path: '/', component: <Feed /> },
  { path: '/feed', component: <Feed /> },
  { path: '/:username', component: <Profile /> },
]
