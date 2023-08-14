import s from "./switchable.module.scss";

import { BackArrowIcon } from "../../images/svg/BackArrow";
import { GroupIcon } from "../../images/svg/GroupIcon";

const SwitchableIcon = ({ view, setView }) => {
  const openDialogs = (e) => {
    if (e.currentTarget.id === "add-user-icon") {
      setView("users");
    } else {
      setView("dialogs");
    }
  };

  return view === "dialogs" ? (
    <span id="add-user-icon" onClick={openDialogs}>
      <GroupIcon className={s.icon} />
    </span>
  ) : (
    <span id="back-arrow-icon" onClick={openDialogs}>
      <BackArrowIcon className={s.icon} />
    </span>
  );
};

export default SwitchableIcon;
