import React, { useEffect, useState, useRef } from 'react';
import {
  Row,
  Container,
  Col,
  Nav,
  Form,
} from 'react-bootstrap';
import cn from 'classnames';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getChannels } from '../services/channelSlice';
import { getMessages } from '../services/messageSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  const [activeChannel, setActiveChannel] = useState({ id: '1', name: 'general' });
  const [inputMessage, setInputMessage] = useState('');

  const { token } = useSelector((state) => state.user);

  const inputElement = useRef(null);

  const changeActiveChannel = (id, name) => setActiveChannel({ id, name });
  const handleChangeInputMessage = (e) => setInputMessage(e.target.value);

  useEffect(() => {
    inputElement.current.focus();
  }, [activeChannel]);

  useEffect(() => {
    const getChatChannels = async () => {
      const channels = await axios.get('/api/v1/channels', { headers: { Authorization: `Bearer ${token}` } });
      dispatch(getChannels(channels.data));
    };

    getChatChannels();
  }, []);

  useEffect(() => {
    const getChatMessages = async () => {
      const messages = await axios.get('/api/v1/messages', { headers: { Authorization: `Bearer ${token}` } });
      dispatch(getMessages(messages.data));
    };

    getChatMessages();
  }, []);

  const currentChannels = useSelector((state) => state.channels.channels);

  const getClassName = (id) => cn('btn w-100 rounded-0 text-start', { 'btn-secondary': activeChannel.id === id });

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button type="button" className="p-0 text-primary btn btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {currentChannels.map(({ id, name }) => (
              <li key={id} className="nav-item w-100">
                <button id={id} type="button" className={getClassName(id)} onClick={() => changeActiveChannel(id, name)}>
                  <span className="me-1">#</span>
                  {name}
                </button>
              </li>
            ))}
          </Nav>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># {activeChannel.name}</b>
              </p>
              <span className="text-muted">0 сообщений</span>
            </div>
            <div id="message-box" className="chat-messages overflow-auto px-5" />
            <div className="mt-auto px-5 py-3">
              <Form className="py-1 border rounded-2">
                <div className="input-group">
                  <Form.Control
                    name="body"
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение..."
                    className="border-0 p-0 ps-2"
                    value={inputMessage}
                    onChange={handleChangeInputMessage}
                    ref={inputElement}
                  />
                  <button type="button" className="btn btn-group-vertical">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                      <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                    </svg>
                    <span className="visually-hidden">Отправить</span>
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
