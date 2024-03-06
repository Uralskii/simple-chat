import React from 'react';
import { useSelector } from 'react-redux';

import { messagesSelectors } from '../slices/messageSlice';

const getActiveChatMessages = (messages, id) => messages.filter((m) => m.channelId === id);

const MessageGroup = ({ channel }) => {
  const messages = useSelector(messagesSelectors.selectAll);
  const activeChannelMessages = getActiveChatMessages(messages, channel.id);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># {channel.name}</b>
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
    </>
  );
};

export default MessageGroup;
