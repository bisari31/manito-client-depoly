import styled from '@emotion/styled';
import { useRef } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import EmojiSkin from '@/components/rollingpaper/emoji-skin';
import SwipeNavigation from '@/components/swipe/swipe-navigation';
import { findEmojiSvgFromTheme } from '@/constants/emojis';
import { useBoundaryIndex } from '@/hooks';
import { Message } from '@/types/message';

interface DetailSwiperProps {
  messages: Message<UserIdAndNickname>[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function MessageSwipe({
  messages,
  activeIndex,
  setActiveIndex,
}: DetailSwiperProps) {
  const swiperRef = useRef<SwiperType>();

  const { isBeginning, isEnd, onBoundaryUpdate } = useBoundaryIndex(
    activeIndex,
    messages.length,
  );

  const handleSlideChange = (e: SwiperType) => {
    const { isBeginning, isEnd, activeIndex } = e;
    onBoundaryUpdate(isBeginning, isEnd);
    setActiveIndex(activeIndex);
  };

  return (
    <StyledSwiper
      initialSlide={activeIndex}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper;
      }}
      modules={[Navigation]}
      onSlideChange={handleSlideChange}
    >
      {messages?.map((message) => {
        const emoji = findEmojiSvgFromTheme(message.theme);
        return (
          <SwiperSlide key={message.id}>
            <EmojiSkin message={message}>
              {emoji?.svg && <emoji.svg />}
              <p>{message.content}</p>
            </EmojiSkin>
          </SwiperSlide>
        );
      })}
      <SwipeNavigation
        isBeginning={isBeginning}
        isEnd={isEnd}
        onSlidePrev={() => swiperRef.current?.slidePrev()}
        onSlideNext={() => swiperRef.current?.slideNext()}
      />
    </StyledSwiper>
  );
}

const StyledSwiper = styled(Swiper)`
  width: 100%;
  position: relative;
`;
