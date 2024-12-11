import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';

// Connect to the WebRTC signaling server
const socket = io('http://localhost:3000'); // Adjust to your backend URL if hosted

const ListenerSession = () => {
  const [sessionId, setSessionId] = useState('');
  const [peer, setPeer] = useState(null);
  const [audioStream, setAudioStream] = useState(null);

  useEffect(() => {
    socket.on('signal', (data) => {
      if (peer) {
        peer.signal(data); // Accept incoming signals
      }
    });

    return () => {
      socket.off('signal'); // Cleanup on component unmount
    };
  }, [peer]);

  const joinSession = () => {
    if (!sessionId) {
      alert('Please enter a session ID.');
      return;
    }

    socket.emit('join-session', { sessionId }, ({ success, message }) => {
      if (success) {
        const newPeer = new SimplePeer({ initiator: false, trickle: false });

        newPeer.on('signal', (data) => {
          socket.emit('signal', { sessionId, signal: data });
        });

        newPeer.on('stream', (stream) => {
          const audioElement = document.querySelector('audio');
          audioElement.srcObject = stream;
          audioElement.play();
          setAudioStream(stream);
        });

        setPeer(newPeer);
        alert('Connected to DJ session!');
      } else {
        alert(message || 'Failed to join session.');
      }
    });
  };

  return (
    <div className="listener-session">
      <h2>Listener Session</h2>
      <input
        type="text"
        placeholder="Enter Session ID"
        value={sessionId}
        onChange={(e) => setSessionId(e.target.value)}
      />
      <button onClick={joinSession}>Join Session</button>
      <audio controls></audio>
    </div>
  );
};

export default ListenerSession;
