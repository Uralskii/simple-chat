import React from 'react';
import { useDispatch } from 'react-redux';
import { changeChannel } from '../../slices/channelSlice';

// eslint-disable-next-line object-curly-newline
const DefaultChannel = ({ key, id, name, getClassName }) => {
  const dispatch = useDispatch();

  return (
    <li key={key} className="nav-item w-100">
      <button
        type="button"
        id={id}
        className={getClassName(id)}
        onClick={() => dispatch(changeChannel({ id, name }))}
      >
        <span className="me-1">#</span>
        {name}
      </button>
    </li>
  );
};

export default DefaultChannel;
