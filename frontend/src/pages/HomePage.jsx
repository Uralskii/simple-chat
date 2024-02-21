import React, { useEffect } from 'react';
import {
  Row,
  Container,
  Col,
  Nav,
  Button,
  // Form,
} from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getChannels } from '../services/channelSlice';
import { getMessages } from '../services/messageSlice';

const HomePage = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

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

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button type="button" className="p-0 text-primary btn btn-group-vertical">Добавить!</Button>
          </div>
          <Nav className="flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {currentChannels.map(({ id, name }) => (
              <li key={id} className="nav-item w-100">
                <Button type="button" className="w-100 rounded-0 text-start btn btn-secondary">
                  <span className="me-1">#</span>
                  {name}
                </Button>
              </li>
            ))}
          </Nav>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b># general</b>
              </p>
              <span className="text-muted">0 сообщений</span>
            </div>
            <div id="message-box" className="chat-messages overflow-auto px-5" />
            <div className="mt-auto px-5 py-3">
              Привет!
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
