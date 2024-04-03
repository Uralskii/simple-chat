import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { messagesSelectors } from '../slices/messageSlice';
import { channelsSelectors } from '../slices/channelSlice';

const getActiveChatMessages = (messages, id) => {
  const channelMessages = messages.filter((m) => m.channelId === id);
  const messagesCount = channelMessages.length;

  return [channelMessages, messagesCount];
};

const MessageGroup = () => {
  const allMessages = useSelector(messagesSelectors.selectAll);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const name = useSelector((state) => channelsSelectors.selectById(state, activeChannelId))
  console.log(name);
  const { t } = useTranslation();

  const [channelMessages, messagesCount] = getActiveChatMessages(allMessages, activeChannelId);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>
            #
          </b>
        </p>
        <span className="text-muted">{t('messages.counter.count', { count: messagesCount })}</span>
      </div>
      <div id="message-box" className="chat-messages overflow-auto px-5">
        {channelMessages.map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.username}</b>
            :
            {message.body}
          </div>
        ))}
      </div>
    </>
  );
};

export default MessageGroup;
