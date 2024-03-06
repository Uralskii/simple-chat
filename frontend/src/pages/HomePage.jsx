import React, { useEffect, useState } from 'react';
import {
  Row,
  Container,
  Col,
  Nav,
} from 'react-bootstrap';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMessages, messagesSelectors } from '../slices/messageSlice';
import { channelsSelectors, fetchChannels } from '../slices/channelSlice';
import SendMessageForm from '../components/SendMessageForm';

const getActiveChatMessages = (messages, id) => messages.filter((m) => m.channelId === id);

const HomePage = () => {
  const dispatch = useDispatch();

  const channels = useSelector(channelsSelectors.selectAll);
  const messages = useSelector(messagesSelectors.selectAll);

  const [activeChannel, setActiveChannel] = useState({ id: '1', name: 'general' });

  const activeChannelMessages = getActiveChatMessages(messages, activeChannel.id);

  const changeActiveChannel = (id, name) => setActiveChannel({ id, name });

  useEffect(() => {
    dispatch(fetchChannels());
  }, []);

  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

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
            {channels.map(({ id, name }) => (
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
              <span className="text-muted">{activeChannelMessages.length} сообщений</span>
            </div>
            <div id="message-box" className="chat-messages overflow-auto px-5">
              {activeChannelMessages.map((message) => (
                <div key={message.id} className="text-break mb-2">
                  <b>{message.username}</b>
                  : {message.body}
                </div>
              ))}
            </div>
            <SendMessageForm channel={activeChannel} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
