import { createContext, useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getUser } from "../redux/user/user-selector";
import { useDispatch } from "react-redux";
import { dialogsActions } from "../redux/dialogs/dialogs-slice";

export const SocketContext = createContext({ socket: null });

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { name, token, id } = useSelector(getUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const newSocket = io.connect("http://localhost:4000", {
      auth: {
        userName: name,
        userId: id,
        token,
      },
    });

    setSocket(newSocket);

    return () => {
      if (socket) {
        ["UpdateDialogs", "InviteAccepted", "MessageAdded"].forEach((el) => socket.off(el));
        socket.disconnect();
      }
    };
  }, [id, name, socket, token]);

  useEffect(() => {
    if (socket) {
      socket.on("UpdateDialogs", (data) => {
        dispatch(dialogsActions.addDialog(data));
      });
      socket.on("InviteAccepted", (data) => {
        dispatch(dialogsActions.updateAcceptedStatus(data));
      });
      socket.on("MessageAdded", (data)=> {
        console.log('mess acceted event',data)
        dispatch(dialogsActions.addMessage(data))

      })
    }
  }, [socket, dispatch]);

  const emitSocketEvent = (event, data) => {
    if (socket && socket.connected) {
      socket.emit(event, data)
    }
  }

  const value = {
    socket,
    emitSocketEvent,
    user: {
      name,
      token,
    },
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
