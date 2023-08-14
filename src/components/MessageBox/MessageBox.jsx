import s from "./message-box.module.scss";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/user/user-selector";

const MessageBox = ({ from, messageContent }) => {
  const { id } = useSelector(getUser);

  const className =
    from !== id
      ? [s.messageBoxInc, s.messageInc, s.timeInc]
      : [s.messageBoxOut, s.messageOut, s.time];
  const messages = messageContent.map((mess) => {
    const time = new Date(Number(mess.time)).toTimeString().split(' ')[0].slice(0,5);
    return (
      <div className={className[1]}>
        <span className={s.text}>{mess.message}</span>
        <span className={className[2]}>{time}</span>
      </div>
    );
  });
  return <div className={className[0]}>{messages}</div>;
};

export default memo(MessageBox);
