import { useEffect, useState } from 'react';
import Portal from './components/Portal';
import ChatLobby from './components/ChatLobby';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { useSelector } from 'react-redux';
import io from 'socket.io-client';

function App() {

  const isValid = useSelector(state => state.isValid)
  const [socket, setSocket] = useState(null);
  
    useEffect(() => {
    const newSocket = io('http://localhost:4000');
    setSocket(newSocket);

    return () => { 
      socket.emit('disconnect');
      socket.off();
        }
    }, [setSocket]);

  return (
    <Router>
      <Routes>
        <Route exact path="*" element={<Navigate to="/" />} />
        <Route exact path="/" element={<Portal socket={socket} />} />
        <Route exact path="/room/:channel" element={isValid ? <ChatLobby socket={socket} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
