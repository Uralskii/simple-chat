import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  Form,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { setCredentials } from '../slices/usersSlice';

const LoginForm = () => {
  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputUsernameElem = useRef(null);
  useEffect(() => {
    inputUsernameElem.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.post('api/v1/login', values);
        dispatch(setCredentials(res.data));
        localStorage.setItem('userId', JSON.stringify(res.data));
        setValidated(false);
        navigate('/');
      } catch (e) {
        setValidated(true);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          isInvalid={validated}
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
          isInvalid={validated}
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
        <div className="invalid-tooltip">Неверные имя пользователя или пароль</div>
      </Form.Floating>
      <Button disabled={formik.isSubmitting} variant="outline-primary" type="submit" className="w-100 mb-3">Войти</Button>
    </Form>
  );
};

export default LoginForm;
