import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { findFontByName } from '@/lib/common';
import { Font } from '@/lib/fonts';
import { getTextareaSize } from '@/styles/mixins';
import { ColorName } from '@/styles/theme';
import { Message } from '@/types/message';

interface RollingpaperEmojiSkinProps {
  children: React.ReactNode;
  isSmall?: boolean;
  message: Pick<Message<unknown>, 'font' | 'fontColor'> &
    Partial<Pick<Message<unknown>, 'position'>> &
    Partial<Pick<Message<unknown>, 'theme'>>;
  paperId?: number;
  onClick?: () => void;
}

export type EmojiType = 'Circle' | 'Square' | 'Clover' | 'Star' | 'Polygon';

const EMOJI_TYPE: EmojiType[] = [
  'Circle',
  'Square',
  'Polygon',
  'Star',
  'Clover',
];

export default function RollingpaperEmojiSkin({
  children,
  isSmall = false,
  onClick,
  message,
}: RollingpaperEmojiSkinProps) {
  const font = findFontByName(message.font);
  const emojiType = EMOJI_TYPE.find((type, i) => {
    if (EMOJI_TYPE.length - 1 === i) return true;
    return message.theme?.includes(type);
  });
  return (
    <StyledEmojiWrapper
      onClick={onClick}
      isSmall={isSmall}
      font={font}
      color={message.fontColor}
      type={emojiType}
    >
      {children}
    </StyledEmojiWrapper>
  );
}

const StyledEmojiWrapper = styled.div<{
  type?: EmojiType;
  color: ColorName;
  font?: Font;
  isSmall?: boolean;
}>`
  ${({ theme, type, color, font, isSmall }) => css`
  width: 100%;
  height: 100%;
  position: relative;
cursor: ${isSmall ? 'pointer' : 'default'};
  img {
    width: 100%;
    height: 100%;
  }

  textarea,
  p {
    overflow-y: ${isSmall ? 'hidden' : 'auto'};
    word-break: break-all;
    white-space: pre-wrap;
    font-size:  ${isSmall ? '14px' : '22px'};
    font-family: ${theme['fontFamily'][font?.name ?? 'SpoqaHanSansNeo']};
    font-weight: ${font?.fontWeight};
    color: ${theme.colors[color]};
    transform: translateX(-50%);
    ${getTextareaSize(type, isSmall)};
    position: absolute;
    left: 50%;
    resize: none;
    outline: none;
    background-color: transparent;
    `}
`;
