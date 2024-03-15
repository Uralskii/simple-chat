import {
  Container,
  Button,
  Navbar,
} from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm" bg="white" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">{t('text.chatTitle')}</Navbar.Brand>
          <Button as={Link} to="/login">{t('buttons.chat.out')}</Button>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default Header;
