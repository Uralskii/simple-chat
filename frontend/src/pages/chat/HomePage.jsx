import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Container, Col } from 'react-bootstrap';

import SendMessageForm from '../../components/forms/SendMessageForm';
import ChannelsGroup from '../../components/ChannelsGroup';
import MessageGroup from '../../components/MessageGroup';
import Spinner from '../../components/Spinner';

import { fetchMessages } from '../../slices/messageSlice';
import { fetchChannels } from '../../slices/channelSlice';

const ChatPage = () => {
  const status = useSelector((state) => state.channels.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, []);

  useEffect(() => {
    dispatch(fetchMessages());
  }, []);

  if (status === 'pending') {
    return (
      <Spinner />
    );
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsGroup />
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <MessageGroup />
            <SendMessageForm />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
