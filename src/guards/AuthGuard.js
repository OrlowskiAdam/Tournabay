import useOsuAuth from "../hooks/useOsuAuth";

const AuthGuard = ({ children }) => {
  const { user } = useOsuAuth();
  if (!user.isInitialized || !user.isAuthenticated) return "Forbidden";
  return children;
};

export default AuthGuard;
