'use client'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { baseApiUrl, showError, userKey } from '../config/global';
import { notifySuccess } from '../config/msgs';
import { setUser } from '../config/store';
import '../../styles/Auth.css';
import logo from '../assets/logo.png';
import Image from 'next/image';

interface UserData{
    name?:string
    email?:string
    password?:string
    confirmPassword?:string
}

const Auth:React.FC = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [userData, setUserData] = useState<UserData>({});
  const router = useRouter();
  const dispatch = useDispatch();

  const signin = async () => {
    try {
      const res = await axios.post(`${baseApiUrl}/signin`, userData);
      dispatch(setUser(res.data)); // Armazenando o usuário no Redux
      localStorage.setItem(userKey, JSON.stringify(res.data));
      window.dispatchEvent(new Event('storage'));
      router.push('/')
    } catch (error) {
      showError(error)
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const signup = async () => {
    try {
      await axios.post(`${baseApiUrl}/signup`, userData);
      notifySuccess('Cadastro realizado com sucesso!');
      setUserData({});
      setShowSignup(false);
    } catch (error) {
      showError(error || 'Erro ao cadastrar');
    }
  };

  return (
    <div className="auth-content">
      <div className="auth-modal">
        <Image src={logo} width="200" alt="Logo" />
        <hr />
        <div className="auth-title">{showSignup ? 'Cadastro' : 'Login'}</div>

        {showSignup && (
          <input
            name="name"
            value={userData.name || ''}
            onChange={handleChange}
            type="text"
            placeholder="Nome"
          />
        )}
        <input
          name="email"
          value={userData.email || ''}
          onChange={handleChange}
          type="text"
          placeholder="E-mail"
        />
        <input
          name="password"
          value={userData.password || ''}
          onChange={handleChange}
          type="password"
          placeholder="Senha"
        />
        {showSignup && (
          <input
            name="confirmPassword"
            value={userData.confirmPassword || ''}
            onChange={handleChange}
            type="password"
            placeholder="Confirme a Senha"
          />
        )}

        <button onClick={showSignup ? signup : signin}>
          {showSignup ? 'Registrar' : 'Entrar'}
        </button>

        <a href="/" onClick={(e) => {
          e.preventDefault();
          setShowSignup(!showSignup);
        }}>
          {showSignup
            ? 'Já possui cadastro? Acesse o Login!'
            : 'Não possui cadastro? Registre-se aqui!'}
        </a>
      </div>
    </div>
  );
};

export default Auth;
