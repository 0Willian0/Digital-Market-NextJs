import { toast } from 'react-toastify';

// Função para exibir notificação de sucesso
const notifySuccess = (msg?: string): void => {
  toast.success(msg || 'Operação realizada com sucesso');
};

// Função para exibir notificação de erro
const notifyError = (msg?: string): void => {
  toast.error(msg || 'Oops... Erro inesperado');
};

export { notifySuccess, notifyError };
