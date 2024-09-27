'use client'; // Esta linha torna o componente um componente do cliente

import React from "react";
import '../../styles/Header.css';
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "@/app/config/store";

// Definindo as propriedades do componente
interface HeaderProps {
  title: string;
  hideToggle: boolean; // Use 'boolean' em minúsculas
}

// Componente Header
const Header: React.FC<HeaderProps> = ({ title, hideToggle }) => {
  // Definindo a tipagem do estado da aplicação
  const isMenuVisible = useSelector((state: { app: { isMenuVisible: boolean } }) => state.app.isMenuVisible); // Tipando o estado
  const dispatch = useDispatch(); // Chama reducers

  // Propriedade computada
  const icon = isMenuVisible ? 'fa-angle-left' : 'fa-angle-down';

  // Método
  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <header className="header">
      {!hideToggle && (
        <a className="toggle" onClick={handleToggleMenu}>
          <i className={`fa fa-lg ${icon}`}></i>
        </a>
      )}
      <h1 className="title">{title}</h1>
    </header>
  );
};

export default Header;
