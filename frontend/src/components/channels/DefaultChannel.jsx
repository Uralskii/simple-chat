import React from 'react';
import { useDispatch } from 'react-redux';
import { changeChannel } from '../../slices/channelSlice';

const DefaultChannel = ({ id, name, getClassName }) => {
  const dispatch = useDispatch();

  return (
    <li key={id} className="nav-item w-100">
      <button type="button" className={getClassName(id)} onClick={() => dispatch(changeChannel({ id, name }))}>
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
};

export default DefaultChannel;
