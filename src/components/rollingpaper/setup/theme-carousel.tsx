import 'swiper/css';

import styled from '@emotion/styled';
import { Swiper, SwiperSlide } from 'swiper/react';

import ThemeItem from '@/components/rollingpaper/setup/theme-item';
import { ROLLINGPAPER_THEMES } from '@/constants/rolling-paper';
import { getFontSizeAndWeight } from '@/styles/mixins';

interface ThemeCarouselProps {
  activeIndex: number;
  onActiveIndexChange: (i: number) => void;
}

export default function ThemeCarousel({
  activeIndex,
  onActiveIndexChange,
}: ThemeCarouselProps) {
  return (
    <StyledWrapper>
      <h2>원하는 테마를 선택해주세요.</h2>
      <div>
        <StyledSwiper
          spaceBetween={16}
          slidesPerView="auto"
          slideToClickedSlide
        >
          {ROLLINGPAPER_THEMES.map(({ themeKor, img }, i) => (
            <SwiperSlide key={themeKor}>
              <ThemeItem
                onClick={() => onActiveIndexChange(i)}
                isActive={i === activeIndex}
                img={img}
                theme={themeKor}
              />
            </SwiperSlide>
          ))}
        </StyledSwiper>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  h2 {
    color: ${(props) => props.theme.colors['gray-900']};
    ${getFontSizeAndWeight('heading2', 'medium')};
  }
`;

const StyledSwiper = styled(Swiper)`
  .swiper-slide {
    width: fit-content;
  }
`;
