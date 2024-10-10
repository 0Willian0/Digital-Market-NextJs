import axios, { AxiosResponse, AxiosError } from 'axios';

// Função de sucesso tipada com AxiosResponse
const success = (res: AxiosResponse): AxiosResponse => res;

// Função de erro tipada com AxiosError
const error = (err: AxiosError): Promise<never> => {
  if (err.response && err.response.status === 401) {
    // Redireciona para a página inicial em caso de erro 401
    window.location.href = '/';
  }
  
  // Sempre retorna uma Promise reject
  return Promise.reject(err);
};

// Configura os interceptores de resposta
axios.interceptors.response.use(success, error);

export default axios;
