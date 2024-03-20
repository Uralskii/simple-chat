import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row, Container, Col, Card, Image,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import LoginForm from '../../components/forms/LoginForm';
import logo from '../../assets/loginimage.jpg';

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={logo} roundedCircle alt="Войти" />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('text.loginFooterText')} </span>
                <Link to="/signup">{t('text.loginFooterLink')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
