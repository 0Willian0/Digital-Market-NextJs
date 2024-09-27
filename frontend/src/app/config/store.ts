import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Definindo os tipos para o usuário (opcional, conforme necessário)
interface User {
  token: string;
  // Adicione outros campos do usuário conforme necessário
}

// Definindo os tipos para o estado da aplicação
interface AppState {
  isMenuVisible: boolean;
  user: User | null; // Você pode manter o usuário aqui, se necessário
}

// Criação do slice
const appSlice = createSlice({
  name: 'app',
  initialState: {
    isMenuVisible: true,
    user: null, // Inicializa o usuário como nulo
  } as AppState,
  reducers: {
    toggleMenu(state, action: PayloadAction<boolean | undefined>) {
      const isVisible = action.payload;
      state.isMenuVisible = isVisible !== undefined ? isVisible : !state.isMenuVisible;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      const user = action.payload;
      if (user) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        state.user = user;
        state.isMenuVisible = true; // Exibir o menu se o usuário estiver logado
      } else {
        delete axios.defaults.headers.common['Authorization'];
        state.user = null; // Limpar o usuário
        state.isMenuVisible = false; // Ocultar o menu se não houver usuário
      }
    },
  },
});

// Exportar as ações
export const { toggleMenu, setUser } = appSlice.actions;

// Criar o store
const store = configureStore({
  reducer: {
    app: appSlice.reducer, // O slice deve ser parte de um objeto
  },
});

// Exportar o store
export default store;
