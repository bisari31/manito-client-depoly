import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { HamburgerMenu, LeftChevron } from '@/assets/svg/icons';
import HeaderSidebar from '@/components/header/sidebar';
import { userQueries } from '@/lib/query-factory';
import routes from '@/routes';
import { HeaderStore, useHeader } from '@/stores/header-store';
import { useLoginModalActions } from '@/stores/login-modal-store';
import { getFontSizeAndWeight } from '@/styles/mixins';
import { ColorName } from '@/styles/theme';

export default function Header() {
  const header = useHeader();
  const navigate = useNavigate();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { toggleOpen } = useLoginModalActions();
  const { data: user } = useQuery(userQueries.detail());

  const handleNavigation = () => {
    const isHomePage = location.pathname === routes.home;
    if (isHomePage) return navigate(routes.landing);
    return navigate(-1);
  };

  const handleSidebarOpen = () => {
    if (!user) {
      toggleOpen(true);
    } else {
      setIsSideMenuOpen(true);
    }
  };

  return (
    <>
      <StyledHeader header={header}>
        <div>
          {header.leftBtn && (
            <StyledLeftButton color={header.color} onClick={handleNavigation}>
              <LeftChevron />
            </StyledLeftButton>
          )}
          <h1>{header.title}</h1>
          {header.rightBtn && (
            <StyledMenuButton color={header.color} onClick={handleSidebarOpen}>
              <HamburgerMenu />
            </StyledMenuButton>
          )}
        </div>
      </StyledHeader>
      {user && (
        <HeaderSidebar
          isOpen={isSideMenuOpen}
          onClose={() => setIsSideMenuOpen(false)}
        />
      )}
    </>
  );
}

export const StyledHeader = styled.header<{
  header: HeaderStore['title'];
}>`
  max-width: ${(props) => props.theme.sizes.mobile};
  width: 100%;
  z-index: 51;
  position: fixed;
  background-color: ${({ header, theme }) => theme.colors[header.bg]};
  border-bottom: ${({ header, theme }) =>
    header.bg === 'white' ? `1px solid ${theme.colors['gray-300']}` : 'none'};
  & > div {
    h1 {
      font-family: ${({ header, theme }) => theme.fontFamily[header.font]};
      ${getFontSizeAndWeight('heading2', 'medium')}
      left: 50%;
      transform: translateX(-50%);
      position: absolute;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${({ header, theme }) => theme.colors[header.color]};
    padding: ${(props) => `0 ${props.theme.sizes.padding}`};
    padding-top: 16px;
    padding-bottom: 16px;
  }
`;

const StyledLeftButton = styled.button<{ color: ColorName }>`
  svg {
    path {
      stroke: ${({ color, theme }) =>
        color === 'gray-800' ? theme.colors['gray-500'] : theme.colors[color]};
    }
  }
`;

const StyledMenuButton = styled.button<{ color: ColorName }>`
  margin-left: auto;
  svg path {
    stroke: ${({ color, theme }) =>
      color === 'gray-800' ? theme.colors['gray-500'] : theme.colors[color]};
  }
`;
