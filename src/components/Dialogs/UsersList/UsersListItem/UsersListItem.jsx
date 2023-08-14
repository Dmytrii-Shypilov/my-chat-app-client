import s from "./users-list-item.module.scss";

import { memo } from "react";

import { Avatar } from "@mui/material";
import { AddUserIcon } from "../../../../images/svg/AddUserIcon";
import { SocketContext } from "../../../../context/socketContext";
import { useContext } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getDialogs } from "../../../../redux/dialogs/dialogs-selector";


const UserslistItem = ({ name, _id }) => {
  const { socket} = useContext(SocketContext);
  const { dialogs } = useSelector(getDialogs);

  const dialog = dialogs.find((el) =>
    el.participants.find((el) => el.id === _id)
  );
  const colocutor = dialog
    ? dialog.participants.find((el) => el.id === _id)
    : null;

    // if this colocutor has sent a request for a connection with the user
const requestedFriendship = dialog && !(dialog.participants.find(el=> el.id !== _id)).accepted
  
const sendDialogRequest = (e) => {
    if (socket && socket.connected && !colocutor) {
      socket.emit("createDialog", { colocutorId: _id, colocutorName: name });
    }
  };

  return (
    <li className={s.user} key={_id}>
      <Avatar>{name[0].toUpperCase()}</Avatar>
      <div className={s.info}>
        <span className={s.name}>{name}</span>
        <span onClick={sendDialogRequest}>
          {requestedFriendship && <span>sent you a request</span>}
          {(colocutor?.accepted && !requestedFriendship) && <span>friend</span>}
          {colocutor && !colocutor.accepted && <span>request sent</span>}
          {!colocutor && <AddUserIcon className={s.icon} height="17" />}
        </span>
      </div>
    </li>
  );
};

export default memo(UserslistItem);
