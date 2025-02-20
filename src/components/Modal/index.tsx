import React from 'react';
import { ModalOverlay, ModalContent, ModalHeader, CloseButton, ModalBody, ModalColumn } from "./styles";

interface ModalProps {
  isOpen: boolean;
  tool: {
    nome: string;
    vantagens: string[];
    limitações: string[];//mudar para desvantagens
  } | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, tool, onClose }) => {
  if (!isOpen || !tool) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>{tool.nome}</h2>
          <CloseButton onClick={onClose}>✖</CloseButton>
        </ModalHeader>
        <ModalBody>
          <ModalColumn>
            <h3>Vantagens</h3>
            <ul>
              {(tool.vantagens || []).map((vantagem, index) => ( 
                <li key={index}>{vantagem}</li>
                ))}
            </ul>
          </ModalColumn>
          <ModalColumn>
            <h3>Limitações</h3>
            <ul>
              {(tool.limitações || []).map((limite, index) => ( //mudar para desvantagens
                <li key={index}>{limite}</li>
              ))}
            </ul>
          </ModalColumn>
        </ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
