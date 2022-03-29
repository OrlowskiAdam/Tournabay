import { useSelector } from 'react-redux';

const useOsuAuth = () => useSelector((state) => state.user);

export default useOsuAuth;
