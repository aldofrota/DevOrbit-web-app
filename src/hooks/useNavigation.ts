import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goTo = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate]
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const goHome = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const goToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const goToPreviousPage = useCallback(() => {
    const previousPath = location.state?.from || "/";
    navigate(previousPath);
  }, [navigate, location]);

  const isCurrentPath = useCallback(
    (path: string) => {
      return location.pathname === path;
    },
    [location]
  );

  return {
    goTo,
    goBack,
    goHome,
    goToLogin,
    goToPreviousPage,
    isCurrentPath,
    currentPath: location.pathname,
  };
};
