

import { createPortal } from "react-dom";

const modalRoot = ({ action, message, setModal }) => {
  const closeModal = () => {
    setModal((prevState) => {
      return {
        ...prevState,
        isVisible: false,
      };
    });
  };

  return createPortal(
    <div>
      <span className={message}>{message}</span>
      <div>
        <button className="button">Ok</button>
        <button className="button" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>,
    modalRoot
  );
};

export default modalRoot;
