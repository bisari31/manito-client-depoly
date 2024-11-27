import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import DetailActionButtons from '@/components/detail/action-buttons';
import DetailAuthorInfo from '@/components/detail/author-info';
import MessageSwiper from '@/components/swiper/message-swiper';
import ReactHelmet, { TITLE } from '@/helmet';
import useDetailIndex from '@/hooks/use-detail-index';
import useSetHeader from '@/hooks/use-set-header';
import { messageQueries, paperQueries } from '@/lib/query-factory';
import { ROLLINGPAPER_BG_MAP } from '@/lib/rolling-paper';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';

export default function RollingpaperDetail() {
  const params = useParams();
  const { data: messages } = useQuery(messageQueries.paper(Number(params.id)));
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));
  const { activeIndex, setActiveIndex } = useDetailIndex(messages);

  useSetHeader({
    title: paper?.title,
    bg: ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgColor,
    color: paper?.theme === 'animal' ? undefined : 'white',
  });

  if (!messages?.length) return null;
  const currentMessage = messages[activeIndex];

  return (
    <StyledWrapper>
      <div>
        <MessageSwiper
          category="rollingpaper"
          messages={messages}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
        <DetailAuthorInfo hasPadding>
          <DetailAuthorInfo.Nickname
            nickname={
              currentMessage?.anonymous || currentMessage?.user?.nickname
            }
          />
          <DetailAuthorInfo.PageLength
            currentIndex={activeIndex}
            totalIndex={messages?.length}
          />
        </DetailAuthorInfo>
      </div>
      <DetailActionButtons
        category="rollingpaper"
        paperAuthorId={paper?.userId}
        message={currentMessage}
      />
      <ReactHelmet title={`${paper?.title} - ${TITLE}`} />
      <StyledBackdrop
        bg={ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgUrl}
      />
    </StyledWrapper>
  );
}
const StyledWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & > div:nth-of-type(1) {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.sizes.paddingTop};
  }
`;
