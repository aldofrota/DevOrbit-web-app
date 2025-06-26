import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "@/layouts/Layout";
import NonAuthLayout from "@/layouts/NonAuthLayout";
import AuthProtected from "@/routes/AuthProtected";
import { authProtectedRoutes, publicRoutes } from "@/routes/allRoutes";
import { AnimatePresence } from "framer-motion";
import { AnimatedPage } from "@/components";
import { useNavigation } from "@/shared/hooks/useNavigation";

const RoutesComponents = () => {
  const location = useLocation();
  const { currentPath } = useNavigation();

  return (
    <React.Fragment>
      <AnimatePresence mode="wait">
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
                    <Layout>
                      <AnimatedPage>{route.component}</AnimatedPage>
                    </Layout>
                  </AuthProtected>
                }
              />
            ))}
          </Route>
        </Routes>
      </AnimatePresence>
    </React.Fragment>
  );
};

export default RoutesComponents;
