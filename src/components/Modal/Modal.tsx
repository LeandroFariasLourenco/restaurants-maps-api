import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

import * as S from './styled';

const Portal = ({
  children,
}) => {
  const portal = window['modal-root'];

  return ReactDOM.createPortal(children, portal);
};

const Modal = ({
  open,
  children,
  onClose,
}) => {
  const onKeyPress = useCallback((event) => {
    if (event.keyCode !== 32) return;

    onClose();
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyPress);

    return () => {
      window.removeEventListener('keydown', onKeyPress);
    };
  }, [onKeyPress]);

  if (!open) {
    return null;
  }

  const onDialogClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Portal>
      <S.Overlay onClick={onClose}>
        <S.Container onClick={onDialogClick}>
          {children}
        </S.Container>
      </S.Overlay>
    </Portal>
  );
};

export default Modal;
