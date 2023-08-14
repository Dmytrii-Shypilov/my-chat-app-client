import s from "./message-input.module.scss";

import { useState } from "react";
import { SendIcon } from "../../images/svg/SendIcon";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getUser } from "../../redux/user/user-selector";
import { useContext } from "react";
import { SocketContext } from "../../context/socketContext";
import { dialogsActions } from "../../redux/dialogs/dialogs-slice";
import { useDispatch } from "react-redux";
const MessageInput = ({ messages, chatId }) => {
  const [message, setMessage] = useState("");
  const { emitSocketEvent } = useContext(SocketContext);
  const { id } = useSelector(getUser);

    const dispatch = useDispatch()

  const onInput = (e) => {
    setMessage(e.target.value);
  };

  const onSendMessage = (e) => {
    e.preventDefault();
    // setOutcomingMessage((prevState) => {
      console.log("messages", messages);
      const time = new Date().getTime();
      const allMessages = [...messages];
      const outcoming = allMessages.filter((mess) => mess.from === id);
      console.log(allMessages);
      if (allMessages.length && outcoming.length > 0) {
        let lastMessage;
        let idx
        
        console.log("outcoming", outcoming);

        if (outcoming.length > 1) {
          console.log("outcoming > 1", outcoming);
          const sorted = outcoming.toSorted(
            (a, b) => a.messageContent.at(-1).time - b.messageContent.at(-1).time
          );
          console.log('sorted', sorted)
          lastMessage = sorted.at(-1);
          idx = allMessages.indexOf(lastMessage);
          console.log("lastMessage", lastMessage);

        } else if (outcoming.length === 1) {
          lastMessage = outcoming[0];
          console.log("lastMessage 1 only", lastMessage);
          
          console.log("idx", idx);
        }

   
        

        if (time - lastMessage.messageContent.at(-1).time < 3000) {
          const text = {
            message,
            time,
            isRead: false,
          };
          console.log('last mess', idx, allMessages, allMessages[idx])
          // allMessages[idx].messageContent.push(text);
          emitSocketEvent('addMessage', {dialogId: chatId, lastMessageIdx: idx, messageData: {from: id, message: text}})
          dispatch(dialogsActions.addMessage({dialogId: chatId, lastMessageIdx: idx, messageData: {from: id, message: text}}))
          console.log("updated All", allMessages);
          // return allMessages;

        } else {
          const text = {
            message,
            time,
            isRead: false,
          };
          // const newMessage = { from: id, messageContent: [text] };
          emitSocketEvent('addMessage', {dialogId: chatId ,lastMessageIdx: null, messageData: {from: id, message: text}})
          dispatch(dialogsActions.addMessage({dialogId: chatId ,lastMessageIdx: null, messageData: {from: id, message: text}}))
          // return [...prevState, newMessage];
        }

      } else {
        const text = {
          message,
          time,
          isRead: false,
        };
        // const newMessage = { from: id, messageContent: [text] };
        emitSocketEvent('addMessage', {dialogId: chatId, lastMessageIdx: null, messageData: {from: id, message: text}})
        dispatch(dialogsActions.addMessage({dialogId: chatId, lastMessageIdx: null, messageData: {from: id, message: text}}))
        // return [...prevState, newMessage];
      }
    // });
    setMessage("");
  };

  return (
    <form onSubmit={onSendMessage} className={s.messageInput}>
      <input
        onChange={onInput}
        value={message}
        className={s.input}
        type="text"
      />
      <button
        type="submit"
        className={s.sendBtn}
        disabled={message ? false : true}
      >
        <SendIcon className={s.sendIcon} />
      </button>
    </form>
  );
};

export default MessageInput;
