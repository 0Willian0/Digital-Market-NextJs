'use client'; // Esta linha torna o componente um componente do cliente

import React from "react";
import '../../styles/Header.css';
import { useSelector, useDispatch } from "react-redux";
import { toggleMenu } from "@/app/config/store";
import UserDropdown from "./UserDropdown";
import Link from "next/link";
import UserBalance from "./UserBalance";

// Definindo as propriedades do componente
interface HeaderProps {
  title: string;
  hideToggle: boolean; // Use 'boolean' em minúsculas
  hideUserDropdown:boolean
}

// Componente Header
const Header: React.FC<HeaderProps> = ({ title, hideToggle, hideUserDropdown }) => {
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

      {!hideUserDropdown?(<h1 className="title">
          <Link href="/">
            {title}
          </Link>
        </h1>):
        (<h1 className="title">
        {title}
        </h1>)}
      
        {!hideUserDropdown && 
        (
          <>
            <UserBalance/>
            <UserDropdown/>
          </>
        )}
      
    </header>
  );
};

export default Header;
