import React, { useEffect, useState } from 'react';
import {
  Row,
  Container,
  Col,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchMessages } from '../../slices/messageSlice';
import { fetchChannels } from '../../slices/channelSlice';
import SendMessageForm from '../../components/SendMessageForm';
import ChannelsGroup from '../../components/ChannelsGroup';
import MessageGroup from '../../components/MessageGroup';
import Spinner from '../../components/Spinner';

const ChatPage = () => {
  const dispatch = useDispatch();
  const [activeChannel, setActiveChannel] = useState({ id: '1', name: 'general' });

  const status = useSelector((state) => state.channels.status);

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
        <ChannelsGroup channel={activeChannel} setActiveChannel={setActiveChannel} />
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <MessageGroup channel={activeChannel} />
            <SendMessageForm channel={activeChannel} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
