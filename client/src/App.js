import { useEffect, useRef, useState } from 'react';
import './App.css';
import io from 'socket.io-client'

function App() {
  const socket = useRef();

  // Establish the socket connection when the site is first loaded
  useEffect(() => {
    if (!socket.current) {
      socket.current = io('//:3001/');
      console.log("Socket connection initiated");
    }
  }, []);

  // Request a list of possible rooms from the server when the button is clicked
  const buttonHandler = () => {
    if (socket.current) {
      socket.current.emit('get_rooms', (rooms) => {
        console.log(rooms);
      });
    }
  }

  // WIP: For now just testing server functionality - proper UI to come later
  return (
    <div>
      <h1>Hi!</h1>
      <h3>I'm Greggory!</h3>
      <button onClick={buttonHandler}>Click me!</button>
    </div>
  );
}

export default App;
