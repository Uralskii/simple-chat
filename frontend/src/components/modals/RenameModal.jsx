import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import {
  Modal,
  FormGroup,
  FormControl,
  Button,
  Form,
} from 'react-bootstrap';

import axios from 'axios';
import { io } from 'socket.io-client';

import routes from '../../utilities/routes';
import getAuthHeader from '../../utilities/getAuthHeader.js';
import { updateChannel } from '../../slices/channelSlice';

const socket = io();

const RenameModal = (props) => {
  const { channelInfo, onHide } = props;
  const { id, name } = channelInfo;

  const dispatch = useDispatch();

  const inputElem = useRef(null);
  useEffect(() => {
    inputElem.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name,
    },
    onSubmit: async (values) => {
      try {
        await axios.patch(routes.idChannelPath(id), values, { headers: getAuthHeader() });
        socket.emit('renameChannel');
        onHide();
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    socket.on('renameChannel', (payload) => {
      const channelId = payload.id;
      const newName = payload.name;

      dispatch(updateChannel({ id: channelId, changes: { name: newName } }));
    });
  }, []);

  return (
    <Modal centered show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputElem}
              onChange={formik.handleChange}
              value={formik.values.name}
              data-testid="input-body"
              name="name"
            />
          </FormGroup>
          <Form.Label visuallyHidden htmlFor="name">Имя канала</Form.Label>
          <div className="d-flex justify-content-end">
            <Button onClick={onHide} type="button" className="btn-secondary mt-2 me-2">Отменить</Button>
            <Button type="submit" className="btn-primary mt-2">Отправить</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
