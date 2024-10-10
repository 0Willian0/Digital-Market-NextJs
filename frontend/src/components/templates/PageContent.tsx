import { useSelector,useDispatch} from "react-redux";
import '../../styles/PageContent.css'
import Content from '@/components/templates/Content';
import { usePathname } from 'next/navigation';
import Footer from '@/components/templates/Footer';
import Header from '@/components/templates/Header';
import Menu from '@/components/templates/Menu';
import Home from "@/app/home/page";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { setUser } from "@/app/config/store";
import { baseApiUrl, userKey } from '../../app/config/global'; 
import axios from "axios";
import { toggleMenu } from "@/app/config/store";

export default function PageContent({ children }: { children: React.ReactNode }){
  const isMenuVisible = useSelector((state: { app: { isMenuVisible: boolean } }) => state.app.isMenuVisible) // Tipando o estado
  const user = useSelector((state: {app: {user:{}}})=> state.app.user)
  const path = usePathname()
  const dispatch = useDispatch();
  const [validatingToken, setValidatingToken] = useState(true);
  const router = useRouter();

  const validateToken = async () => {
    setValidatingToken(true);

    const json = localStorage.getItem(userKey);
    const userData = json ? JSON.parse(json) : null;
    dispatch(setUser(null));

    if (!userData) {
      setValidatingToken(false);
      router.push('/auth')
      return;
    }

    try {
      const res = await axios.post(`${baseApiUrl}/validateToken`, userData);

      if (res.data) {
        dispatch(setUser(userData));
        if (window.innerWidth <= 768) {
          dispatch(toggleMenu(false));
        }
      } else {
        localStorage.removeItem(userKey);
        router.push('/auth')
      }
    } catch (error) {
      console.error('Error validating token:', error);
      localStorage.removeItem(userKey);
      router.push('/auth')
    }

    setValidatingToken(false);
  };

  useEffect(() => {
    validateToken();
  }, []);
  
    return(
        <div id="page-content" className={!isMenuVisible ? 'hide-menu':''}>
          <Header title="Digital Market" hideToggle={!user} hideUserDropdown={!user} />
          {isMenuVisible&&(user &&(<Menu />))}
          {path == '/' ? (<Home/>):(<Content>{children}</Content>)}
          <Footer />
        </div>
    )
}