// app/page.tsx
'use client'; // Se precisar usar Client Component
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from '@/app/config/store'; 
import PageContent from '../components/templates/PageContent';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'; // Importa o CSS
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';

export default function Page({ children }: { children: React.ReactNode }) {

  return (
      <Provider store={store}>
          <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
          <PageContent>{children}</PageContent>

      </Provider> 
  );
}


