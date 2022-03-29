import { MainLayout } from '../components/main-layout';
import { Container } from '@mui/material';
import useOsuAuth from '../hooks/useOsuAuth';

const HomePage = () => {
  const { user } = useOsuAuth();

  return (
    <Container maxWidth="lg">
      {user.username}
    </Container>
  );
};

HomePage.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
);

export default HomePage;
