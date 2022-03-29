import { MainLayout } from '../components/main-layout';
import { Button, Container } from '@mui/material';
import useOsuAuth from '../hooks/useOsuAuth';

const HomePage = () => {
  const { user } = useOsuAuth();
  console.log(user);

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
