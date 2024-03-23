import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';

import { changeChannel } from '../../slices/channelSlice';
import { setModalShow } from '../../slices/modalSlice';

const RemovableChannel = ({ id, name, getClassName }) => {
  const channelId = useSelector((state) => state.channels.activeChannel.id);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Dropdown key={id} className="d-flex" as={ButtonGroup}>
      <button type="button" className={getClassName(id)} onClick={() => dispatch(changeChannel({ id, name }))}>
        <span className="me-1">#</span>
        {filter.clean(name)}
      </button>
      <Dropdown.Toggle split variant={channelId === id ? 'secondary' : 'none'} id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => dispatch(setModalShow({ isOpen: true, type: 'removing' }))}>{t('buttons.channels.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={() => dispatch(setModalShow({ isOpen: true, type: 'renaming' }))}>{t('buttons.channels.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default RemovableChannel;
