import { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../../Button/Button";
import classes from "./Modal.module.css";

const Modal = ({
  open,
  message,
  onClose,
  buttons = null,
  autoClose = true,
  duration = 4000,
}) => {
  useEffect(() => {
    if (open && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, autoClose, duration, onClose]);

  if (!open) return null;

  return createPortal(
    <div className={classes.overlay}>
      <div className={classes.modal}>
        <h3>{message}</h3>
        <div className={classes.buttonArea}>
          {buttons &&
            buttons.map((item, index) => (
              <Button
                type="button"
                onClick={() => {item.function ? item.function() : onClose()}}
                key={index}
              >
                {item.name}
              </Button>
            ))}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
