import useOsuAuth from "../hooks/useOsuAuth";

const AuthGuard = ({ children }) => {
  const { user } = useOsuAuth();
  if (!user.isInitialized || !user.isAuthenticated) return "Ni chuja";
  return children;
};

export default AuthGuard;
