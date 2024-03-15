import React from 'react';
import { useSelector } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';

import { messagesSelectors } from '../slices/messageSlice';

const getActiveChatMessages = (messages, id) => messages.filter((m) => m.channelId === id);

const MessageGroup = ({ channel }) => {
  const messages = useSelector(messagesSelectors.selectAll);
  const activeChannelMessages = getActiveChatMessages(messages, channel.id);

  const { t } = useTranslation();
  const count = activeChannelMessages.length;

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># {filter.clean(channel.name)}</b>
        </p>
        <span className="text-muted">{t('messages.counter.count', { count })}</span>
      </div>
      <div id="message-box" className="chat-messages overflow-auto px-5">
        {activeChannelMessages.map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>
            : {filter.clean(message.body)}
          </div>
        ))}
      </div>
    </>
  );
};

export default MessageGroup;
