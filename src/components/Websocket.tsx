'use client';

import { useEffect, useState } from 'react';
import { socket } from '@/socket';

export default function Websocket() {
  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log('Websocket is connected!');
      socket.io.engine.on('upgrade', (transport) => {
        console.log('socket >', transport.name);
      });
    }

    function onDisconnect() {
      console.log('Websocket is disconnected!');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);
  return '';
}
