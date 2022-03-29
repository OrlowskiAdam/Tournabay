import { useSelector } from "../store";

const useOsuAuth = () => useSelector((state) => state.user);

export default useOsuAuth;
