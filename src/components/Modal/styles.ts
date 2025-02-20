import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContent = styled.div`
  background: white;
  width: 500px;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: all 0.3s ease-in-out;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

export const ModalBody = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

export const ModalColumn = styled.div`
  width: 45%;
  h3 {
    font-size: 16px;
    margin-bottom: 10px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    font-size: 14px;
    margin-bottom: 5px;
  }
`;
