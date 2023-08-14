import s from "./chat-section.module.scss";

import { useRef,useEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getDialogs } from "../../redux/dialogs/dialogs-selector";
import MessageBox from "../MessageBox";
import MessageInput from "../MessageInput";
import Button from "../../ui/Button/Button";

const ChatSection = ({ chatData }) => {
  const [messages, setMessages] = useState([]);

  const chat = useRef()
  const {dialogs} = useSelector(getDialogs)
  const {chatId, colocutor} = chatData
  
  console.log('chatDta', chatData)

  const moveToBottom = () => {
    chat.current.scrollTop = chat.current.scrollHeight;
  };


  useEffect(() => {
    const messages = dialogs.find(dial=> dial._id === chatId)?.messages
    setMessages(messages)
    moveToBottom();
    /// Event setting the messages to isRead: true
  }, [dialogs, chatData, chatId]);

  useEffect(() => {
    moveToBottom();
  }, [messages]);

  const messagesList = messages.map(({ from, messageContent }) => (
    <MessageBox from={from} messageContent={messageContent} />
  ));

  return (
    <section className={s.chatSection}>
      <div className={s.chatHeader}>
        <span className={s.colocutor}>{colocutor}</span>
        <Button type='light' style={{position: 'absolute', right: 25}}>
          delete dialog
        </Button>
      </div>
      <div ref={chat} className={s.chatField}>
        {messagesList}
      </div>
      <MessageInput messages={messages} chatId={chatId} setOutcomingMessage={setMessages} />
    </section>
  );
};

export default ChatSection;
