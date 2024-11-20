import styled from '@emotion/styled';
import React from 'react';

import { ROLLINGPAPER_EMOJI_MAP } from '@/lib/rolling-paper';

interface EmojiContentProps {
  theme: RollingThemeName;
  activeEmoji: string;
  handleChangeEmoji: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function EmojiSheet({
  theme,
  activeEmoji,
  handleChangeEmoji,
}: EmojiContentProps) {
  return (
    <StyledWrapper>
      {ROLLINGPAPER_EMOJI_MAP[theme].map((emoji) => (
        <StyledItem
          name="emoji"
          value={emoji.name}
          isActive={activeEmoji === emoji.name}
          key={emoji.name}
          type="button"
          onClick={handleChangeEmoji}
        >
          <emoji.svg />
        </StyledItem>
      ))}
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  display: grid;
  gap: 8px 16px;
  grid-template-columns: repeat(4, 1fr);
`;

const StyledItem = styled.button<{ isActive: boolean }>`
  outline: ${({ isActive, theme }) =>
    isActive ? `1px dashed ${theme.colors['powderBlue-900']}` : 'none'};
  padding: 0;
  svg {
    width: 100%;
    height: 100%;
  }
  aspect-ratio: 1;
  border-radius: 4px;
`;
