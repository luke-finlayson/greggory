import { useEffect, useRef, useState } from 'react';
import './App.css';
import io from 'socket.io-client'

function App() {
  const socket = useRef();
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io('//:3001/');
      console.log("Socket connection initiated");
    }
  }, []);

  const buttonHandler = () => {
    setCounter(counter + 1);
    console.log("Button click!");

    if (socket.current) {
      socket.current.emit('add_score', counter);
      console.log("Sent counter");
    }
  }

  return (
    <div>
      <h1>Hi!</h1>
      <h3>I'm Greggory!</h3>
      <button onClick={buttonHandler}>Click me!</button>
    </div>
  );
}

export default App;
