import { MainLayout } from '../components/main-layout';
import { Container } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      asd
    </Container>
  );
};

HomePage.getLayout = (page) => (
  <MainLayout>
    {page}
  </MainLayout>
);

export default HomePage;
