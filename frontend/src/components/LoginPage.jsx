import React, { useEffect, useRef } from 'react';
import {
  Row,
  Container,
  Button,
  Navbar,
  Col,
  Card,
  Image,
  Form,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';

import logo from '../assets/loginimage.jpg';

const LoginPage = () => {
  const inputUsernameElem = useRef(null);

  useEffect(() => {
    inputUsernameElem.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <Navbar className="shadow-sm" bg="white" expand="lg">
        <Container>
          <Navbar.Brand>Hexlet Chat</Navbar.Brand>
          <Button>Выйти</Button>
        </Container>
      </Navbar>
      <Container fluid className="h-100">
        <Row className="justify-content-center align-content-center h-100">
          <Col className="col-12 col-md-8 col-xxl-6">
            <Card className="shadow-sm">
              <Card.Body className="row p-5">
                <Col className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <Image src={logo} roundedCircle alt="Войти" />
                </Col>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      name="username"
                      id="username"
                      autoComplete="username"
                      required
                      type="text"
                      placeholder="Ваш ник"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      ref={inputUsernameElem}
                    />
                    <Form.Label htmlFor="username">Ваш ник</Form.Label>
                  </Form.Floating>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      name="password"
                      id="password"
                      autoComplete="current-password"
                      required
                      type="password"
                      placeholder="Пароль"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <Form.Label htmlFor="password">Пароль</Form.Label>
                  </Form.Floating>
                  <Button disabled={formik.isSubmitting} variant="outline-primary" type="submit" className="w-100 mb-3">Войти</Button>
                </Form>
              </Card.Body>
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <Link to="/signup">Регистрация</Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
