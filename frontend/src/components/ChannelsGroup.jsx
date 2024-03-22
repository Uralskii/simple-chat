import React from 'react';
import { Col } from 'react-bootstrap';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { channelsSelectors } from '../slices/channelSlice';
import DefaultChannel from './channels/DefaultChannel';
import RemovableChannel from './channels/RemovableChannel';
import { setModalShow } from '../slices/modalSlice';

const ChannelsGroup = () => {
  const channels = useSelector(channelsSelectors.selectAll);
  const channelId = useSelector((state) => state.channels.activeChannel.id);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const getClassName = (id) => cn('btn w-100 rounded-0 text-start', { 'btn-secondary': channelId === id });

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('text.channels')}</b>
        <button onClick={() => dispatch(setModalShow({ isOpen: true, type: 'adding' }))} type="button" className="p-0 text-primary btn btn-group-vertical">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" />
          <span className="visually-hidden">{t('buttons.chat.add')}</span>
        </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map(({ id, name, removable }) => (
          removable
            ? <RemovableChannel id={id} name={name} getClassName={getClassName} />
            : <DefaultChannel id={id} name={name} getClassName={getClassName} />
        ))}
      </ul>
    </Col>
  );
};

export default ChannelsGroup;
