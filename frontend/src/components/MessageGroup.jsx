import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';

import { messagesSelectors } from '../slices/messageSlice';

const getActiveChatMessages = (messages, id) => {
  const channelMessages = messages.filter((m) => m.channelId === id);
  const messagesCount = channelMessages.length;

  return [channelMessages, messagesCount];
};

const MessageGroup = () => {
  const { id, name } = useSelector((state) => state.channels.activeChannel);
  const allMessages = useSelector(messagesSelectors.selectAll);

  const { t } = useTranslation();

  const [channelMessages, messagesCount] = getActiveChatMessages(allMessages, id);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># {filter.clean(name)}</b>
        </p>
        <span className="text-muted">{t('messages.counter.count', { count: messagesCount })}</span>
      </div>
      <div id="message-box" className="chat-messages overflow-auto px-5">
        {channelMessages.map((message) => (
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
