import { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

import Toast from '@/components/common/toast';
import Header from '@/components/header/header';
import Sidebar from '@/components/header/sidebar';
import LoginModal from '@/components/modal/login-modal';
import {
  StyledBrowserBackdrop,
  StyledMain,
  StyledWrapper,
} from '@/pages/layout.style';
import { token } from '@/utils/storage';

export default function Layout() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const isLoggedIn = token.getAccessToken();
  const handleSidebarOpen = () => {
    if (!token.getAccessToken()) return setIsLoginModalOpen(true);
    setIsSideMenuOpen(true);
  };

  return (
    <StyledWrapper>
      <Header onSidebarOpen={handleSidebarOpen} />
      <StyledMain>
        <div />
        <div>{<Outlet />}</div>
      </StyledMain>
      {isLoggedIn && (
        <Sidebar
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      )}
      <StyledBrowserBackdrop />
      <Toast />
      {isLoginModalOpen && (
        <LoginModal
          onToggleModal={() => setIsLoginModalOpen((prev) => !prev)}
        />
      )}
      <ScrollRestoration />
    </StyledWrapper>
  );
}
