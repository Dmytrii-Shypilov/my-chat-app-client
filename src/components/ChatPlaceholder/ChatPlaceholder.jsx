import s from "./chat-placeholder.module.scss";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { getUser } from "../../redux/user/user-selector";

const ChatPlaceholder = () => {
  const { name } = useSelector(getUser);
  return (
    <div className={s.placeholder}>
      <div className={s.textWrapper}>
        <p className={s.text}>
          Hello, <span className={s.name}>{name}</span>!
        </p>
        <p className={s.text}>How is it going?</p>
      </div>
    </div>
  );
};

export default ChatPlaceholder;
