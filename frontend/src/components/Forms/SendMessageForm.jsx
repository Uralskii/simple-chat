import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';

import axios from 'axios';
import filter from 'leo-profanity';

import routes from '../../routes';
import getAuthHeader from '../../utilities/getAuthHeader';
import notification from '../Toast';
import send from '../../assets/send.svg';

const SendMessageForm = () => {
  const { username } = useSelector((state) => state.user);
  const { activeChannelId } = useSelector((state) => state.channels);

  const { t } = useTranslation();

  const inputElement = useRef(null);
  useEffect(() => {
    inputElement.current.focus();
  }, [activeChannelId]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async ({ message }, { resetForm }) => {
      const newMessage = {
        body: filter.clean(message),
        channelId: activeChannelId,
        username,
      };

      try {
        await axios.post(routes.messagesPath(), newMessage, { headers: getAuthHeader() });
        resetForm();
      } catch (err) {
        notification.errorNotify(t('errors.network'));
      }
    },
  });

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <div className="input-group">
          <Form.Control
            className="border-0 p-0 ps-2"
            name="message"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            value={formik.values.message}
            onChange={formik.handleChange}
            ref={inputElement}
          />
          <button
            disabled={formik.isSubmitting}
            type="submit"
            className="btn btn-group-vertical"
          >
            <img src={send} alt="Отправить сообщение" />
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SendMessageForm;
