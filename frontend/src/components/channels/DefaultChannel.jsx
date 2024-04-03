import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const DefaultChannel = ({ id, name, isCurrent, changeChannel }) => {
  const channelId = useSelector((state) => state.channels.activeChannelId);

  return (
    <li key={id} className="nav-item w-100">
      <Button
        type="button"
        id={id}
        className="w-100 rounded-0 text-start text-truncate btn" 
        variant={isCurrent(channelId, id)} 
        onClick={changeChannel(id, name)}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
    </li>
  );
};

export default DefaultChannel;
