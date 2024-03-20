import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import axios from 'axios';

import routes from '../../routes';
import { setCredentials } from '../../slices/userSlice';

const LoginForm = () => {
  const [isInvalid, setIsInvalid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const inputUsername = useRef(null);
  useEffect(() => {
    inputUsername.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsInvalid(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        dispatch(setCredentials(res.data));
        setIsInvalid(false);
        navigate('/');
      } catch (err) {
        setIsInvalid(true);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">{t('loginForm.title')}</h1>

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
          ref={inputUsername}
          isInvalid={isInvalid}
        />
        <label htmlFor="username">{t('loginForm.username')}</label>
      </Form.Floating>

      <Form.Floating className="mb-3">
        <Form.Control
          name="password"
          id="password"
          required
          type="password"
          placeholder="Пароль"
          value={formik.values.password}
          onChange={formik.handleChange}
          isInvalid={isInvalid}
        />
        <label htmlFor="password">{t('loginForm.password')}</label>
        <div className="invalid-tooltip">{t('errors.login')}</div>
      </Form.Floating>

      <Button disabled={formik.isSubmitting} variant="outline-primary" type="submit" className="w-100 mb-3">{t('loginForm.title')}</Button>
    </Form>
  );
};

export default LoginForm;
