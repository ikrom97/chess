type ModalProps = {
  children: JSX.Element;
  isActive: boolean;
  setIsActive: (status: boolean) => void;
}

function Modal({ isActive, setIsActive, children }: ModalProps): JSX.Element {
  return (
    <div
      className={isActive ? 'modal modal--active' : 'modal'}
      onClick={() => setIsActive(false)}
    >
      <div className="modal__content" onClick={(evt) => evt.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
