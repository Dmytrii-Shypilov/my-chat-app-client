import s from "./dialogs.module.scss";

import { Avatar } from "@mui/material";

import DialogsList from "./DialogsList";
import { SearchIcon } from "../../images/svg/SearchIcon";
import SwitchableIcon from "../SwitchableIcon";
import UsersList from "./UsersList";
import { useEffect, useState } from "react";
import { LogOutIcon } from "../../images/svg/LogOutIcon";
import { logOutUser } from "../../redux/user/user-operations";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { SocketContext } from "../../context/socketContext";
import { getUser } from "../../redux/user/user-selector";
import { obtainAllUsers } from "../../redux/allUsers/allUsers-selector";
import { getDialogs } from "../../redux/dialogs/dialogs-selector";


const DialogsSection = ({ openChat }) => {
  const [dialogsList, setDialogsList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [view, setView] = useState("dialogs");

  const dispatch = useDispatch();
  const { token, name } = useSelector(getUser);
  const { allUsers } = useSelector(obtainAllUsers);
  const { socket } = useContext(SocketContext);
  const { dialogs } = useSelector(getDialogs);

  useEffect(() => {
    setDialogsList(dialogs);
  }, [dialogs]);

  useEffect(() => {
    setUsersList(allUsers);
  }, [allUsers]);

  const onLogOut = () => {
    if (socket) {
      socket.disconnect();
    }
    dispatch(logOutUser(token));
  };

  const onFilterDialogs = (e) => {
    if (view === "dialogs") {
      const filtered = dialogs.reduce((acc, el) => {
        const isInside = el.participants.some((dial) => {
          return (
            dial.name.toLowerCase().includes(e.target.value.toLowerCase()) &&
            dial.name !== name
          );
        });
        if (isInside) {
          acc.push(el);
          return acc;
        }
        return acc;
      }, []);
      setDialogsList(filtered);
    }
    if (view === "users") {
      if (!e.target.value) {
        setUsersList(allUsers);
        return;
      }
      const filtered = usersList.filter((user) =>
        user.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setUsersList(filtered);
    }
  };

  return (
    <section className={s.section}>
      <div className={s.header}>
        <Avatar>{name[0]}</Avatar>
        <span className={s.name}>{name}</span>
        <button className={s.logOutBtn} onClick={onLogOut}>
          <LogOutIcon className={s.logOutIcon} />
        </button>
      </div>

      <div className={s.searchBox}>
        <SearchIcon className={s.icon} />
        <input
          onChange={onFilterDialogs}
          className={s.searchInput}
          type="text"
        />
        <SwitchableIcon view={view} setView={setView} />
      </div>
      {view === "dialogs" && (
        <DialogsList openChat={openChat} dialogs={dialogsList} />
      )}
      {view === "users" && <UsersList users={usersList} />}
    </section>
  );
};

export default DialogsSection;
