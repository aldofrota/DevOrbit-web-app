import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Layout from '@/app/layout/Layout'
import NonAuthLayout from '@/app/layout/NonAuthLayout'
import AuthProtected from '@/app/routes/AuthProtected'
import { authProtectedRoutes, publicRoutes } from '@/app/routes/allRoutes'
import { useNavigation } from '@/hooks'

const RoutesComponents = () => {
  const location = useLocation()
  const { currentPath } = useNavigation()

  return (
    <React.Fragment>
      <Routes location={location} key={currentPath}>
        <Route>
          {publicRoutes.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              element={<NonAuthLayout>{route.component}</NonAuthLayout>}
            />
          ))}
        </Route>

        <Route>
          {authProtectedRoutes.map((route, idx) => (
            <Route
              key={idx}
              path={route.path}
              element={
                <AuthProtected>
                  <Layout>{route.component}</Layout>
                </AuthProtected>
              }
            />
          ))}
        </Route>
      </Routes>
    </React.Fragment>
  )
}

export default RoutesComponents
