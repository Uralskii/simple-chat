import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { removeCredentials } from '../slices/userSlice.js';

const Header = () => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handeleRemoveUser = () => {
    dispatch(removeCredentials());
    localStorage.removeItem('userId');
  };

  return (
    <Navbar className="shadow-sm" bg="white" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('text.chatTitle')}</Navbar.Brand>
        {token
          ? <Button as={Link} onClick={() => handeleRemoveUser()} to="/login">{t('buttons.chat.out')}</Button>
          : null}
      </Container>
    </Navbar>
  );
};

export default Header;
