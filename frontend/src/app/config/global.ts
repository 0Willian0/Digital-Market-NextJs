// config.ts
import { notifyError } from './msgs';

// Definindo constantes
export const userKey: string = '__Market_user';
export const baseApiUrl: string = 'http://localhost:3001';

// Função para exibir erros
export function showError(e: any): void {
  const errorMsg: string =
    e?.response?.data || (typeof e === 'string' ? e : 'An unknown error occurred');
  notifyError(errorMsg);
  // Ou use uma biblioteca de notificação para exibir mensagens de erro no UI, como react-toastify
}

// Exportando um objeto com as configurações
export default { baseApiUrl, showError, userKey };
