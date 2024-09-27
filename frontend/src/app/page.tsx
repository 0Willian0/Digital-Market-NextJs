'use client';
import '../styles/Page.css'
import { Provider } from 'react-redux';
import store from '@/app/config/store'
import Footer from "@/components/templates/Footer";
import 'font-awesome/css/font-awesome.css';
import Header from "@/components/templates/Header";
import Menu from '@/components/templates/Menu';
import Content from '@/components/templates/Content';

export default function Home() {
  return (
   <div id="page">
    <Provider store={store}>
    <Header title="Digital Market" hideToggle={false}/>
    <Menu/>
    </Provider>
    
    <Content/>
    <Footer/>
      
   </div>
  );
}
