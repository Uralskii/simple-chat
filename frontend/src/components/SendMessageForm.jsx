import React, { useEffect, useState, useRef } from 'react';
import {
  Form,
} from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { addMessage } from '../slices/messageSlice';
import routes from '../utilities/routes';
import getAuthHeader from '../utilities/getAuthHeader';

const socket = io();

const SendMessageForm = ({ channel }) => {
  console.log(channel);
  const dispatch = useDispatch();

  const { username } = useSelector((state) => state.users);
  const [textMessage, setInputMessage] = useState('');

  const inputElement = useRef(null);
  useEffect(() => {
    inputElement.current.focus();
  }, [channel]);

  const handleChangeInputMessage = (e) => setInputMessage(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { body: textMessage, channelId: channel.id, username };

    try {
      await axios.post(routes.postMessagePath(), newMessage, { headers: getAuthHeader() });
      socket.emit('newMessage', newMessage);
    } catch (err) {
      console.log(err);
    }
    setInputMessage('');
  };

  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(addMessage(payload));
    });
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmit} className="py-1 border rounded-2">
        <div className="input-group">
          <Form.Control
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение..."
            className="border-0 p-0 ps-2"
            value={textMessage}
            onChange={handleChangeInputMessage}
            ref={inputElement}
          />
          <button type="submit" className="btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
            </svg>
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </Form>
    </div>
  );
};

export default SendMessageForm;
