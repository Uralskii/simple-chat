import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Modal,
  FormGroup,
  Form,
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';

import routes from '../../routes';
import getAuthHeader from '../../utilities/getAuthHeader';
import { removeChannel } from '../../slices/channelSlice';

const socket = io();

const RemoveModal = ({ channelInfo, onHide, changeChannel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.delete(routes.idChannelPath(channelInfo.id), { headers: getAuthHeader() });
      socket.emit('removeChannel');
      onHide();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    socket.on('removeChannel', ({ id }) => {
      changeChannel('1', 'general');
      dispatch(removeChannel(id));
    });
  }, []);

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modals.removeTitle')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <p className="lead">{t('modals.removeBody')}</p>
          </FormGroup>
          <div className="d-flex justify-content-end">
            <Button onClick={onHide} type="button" className="btn-secondary mt-2 me-2">{t('buttons.channels.back')}</Button>
            <Button type="submit" className="btn-danger mt-2">{t('buttons.channels.remove')}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
