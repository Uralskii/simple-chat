import {
  Container,
  Button,
  Navbar,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { removeCredentials } from '../slices/usersSlice.js';

const Header = () => {
  const { t } = useTranslation();
  const token = useSelector((state) => state.users.token);

  const dispatch = useDispatch();

  const handeleRemoveUser = () => {
    dispatch(removeCredentials());
    localStorage.removeItem('userId');
  };

  return (
    <Navbar className="shadow-sm" bg="white" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('text.chatTitle')}</Navbar.Brand>
        {token ? <Button onClick={() => handeleRemoveUser()} as={Link} to="/login">{t('buttons.chat.out')}</Button>
          : null}
      </Container>
    </Navbar>
  );
};

export default Header;
