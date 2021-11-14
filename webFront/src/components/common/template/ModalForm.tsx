import React from "react";
import styled from "styled-components";

interface IModalForm {
  toggleModal: () => void;
}
const ModalForm: React.FC<IModalForm> = ({ children, toggleModal }) => {
  return (
    <ModalBlock>
      <div className="modal">
        <div className="modalHead">
          <span onClick={toggleModal}>X</span>
        </div>
        <div className="content">{children}</div>
      </div>
    </ModalBlock>
  );
};

const ModalBlock = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);

  position: absolute;
  top: 0;
  left: 0;

  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;
  & > .modal {
    width: 480px;
    min-height: 360px;

    background-color: white;

    display: flex;
    flex-direction: column;
    @media (max-width: 768px) {
      width: 90%;
      min-height: 280px;
    }
    & > .modalHead {
      width: 100%;
      height: 24px;
      background-color: #242424;
      color: white;

      padding: 0 8px;

      display: flex;
      align-items: center;
      justify-content: flex-end;

      & > span {
        cursor: pointer;
      }
    }
    & > .content {
      flex: 1;

      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

export default ModalForm;
