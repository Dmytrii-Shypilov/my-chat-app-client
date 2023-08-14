import s from "./chat-page.module.scss";

import { useEffect, useState } from "react";
import ChatSection from "../../components/ChatSection";
import DialogsSection from "../../components/Dialogs/DialogsSection";
import { SocketContextProvider } from "../../context/socketContext";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/user/user-selector";
import { getAllUsers } from "../../redux/allUsers/allUsers-operations";
import { getCurrentUser } from "../../redux/user/user-operations";
import { getAllDialogs } from "../../redux/dialogs/dialogs-operations";
import ChatPlaceholder from "../../components/ChatPlaceholder";


const ChatPage = () => {
  const { token } = useSelector(getUser);
  const [chat, setChat] = useState({
    isChatOpen: false,
    chatData: {chatId: null, colocutor: null},
  });

  const { isChatOpen, chatData } = chat;
  const dispatch = useDispatch();


  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser(token));
      dispatch(getAllUsers(token));
      dispatch(getAllDialogs(token));
    }
  }, [dispatch, token]);

  return (
    <SocketContextProvider>
      <section className={s.section}>
        <DialogsSection openChat={setChat}  />
        {isChatOpen && <ChatSection chatData={chatData} />}
        {!isChatOpen && <ChatPlaceholder />}
      </section>
    </SocketContextProvider>
  );
};

export default ChatPage;
