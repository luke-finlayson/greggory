import e from "express";
import { Fragment, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Button from "./components/Button";
import { SocketEvents } from "./utils/SocketEvents";

function App() {
  const socket = useRef<Socket>();
  const [room, setRoom] = useState<string>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!socket.current) {
      socket.current = io('//:3001');
    }
  }, []);

  const createRoom = () => setRoom(uuidv4());

  const joinRoom = () => {
    if (socket.current?.connected) {
      socket.current.emit(SocketEvents.joinRoom, room);
    }
    else {
      setError("Unable to join room - disconnected from server");
    }
  }

  const updateRooms = () => {
    if (socket.current?.connected) {
      socket.current.emit(SocketEvents.update);
    }
    else {
      setError("Update failed - disconnected from server");
    }
  }

  return (
    <Fragment>
      <p className="error">{error}</p>

      <h1 className="text-xl">This. Is. Greggory.</h1>

      <button type="button" onClick={updateRooms}>Update</button>

      <br/>

      <p>Current room: {room}</p>
      <div className="flex items-center space-x-3">
        <Button onClick={createRoom}>Create</Button>
        <Button onClick={joinRoom}>Join</Button>
      </div>
    </Fragment>
  );
}

export default App;
