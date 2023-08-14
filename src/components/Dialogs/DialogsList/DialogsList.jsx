import s from "./dialogs-list.module.scss";

import { useSelector } from "react-redux/es/hooks/useSelector";
import { getUser } from "../../../redux/user/user-selector";

import DialogItem from "./DialogItem";

const DialogsList = ({ dialogs, openChat }) => {
  const { id } = useSelector(getUser);
  // checks if all dialogs are created by the user: 
  // if 'false' => he has invitation to accept
  // const allCreatedByUser = dialogs.every(el=> (el.participants.find(el=> el.id === id))?.accepted)

  const dialogsList =
    dialogs.length  ? (
      dialogs.map((dialog) => {
        const colocutor = dialog.participants.find((el) => el.id !== id);
        return <DialogItem openChat={openChat} colocutor={colocutor} dialog={dialog} key={dialog._id} />;
      })
    ) : (
      <p className="message">You don't have active dialogs</p>
    );

  return <ul className={s.dialogs}>{dialogsList}</ul>;
};

export default DialogsList;
