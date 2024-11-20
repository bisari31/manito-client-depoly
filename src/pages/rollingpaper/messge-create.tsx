import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { useLocation, useParams } from 'react-router-dom';

import { Button } from '@/components/common/button/buttons';
import CreateMessageModal from '@/components/modal/create-message-modal';
import BottomSheetButton from '@/components/rollingpaper/bottom-sheet/button';
import EmojiSheet from '@/components/rollingpaper/bottom-sheet/emoji-sheet/emoji-sheet';
import ColorList from '@/components/rollingpaper/bottom-sheet/font-sheet/color-list';
import FontList from '@/components/rollingpaper/bottom-sheet/font-sheet/font-list';
import FontSheet from '@/components/rollingpaper/bottom-sheet/font-sheet/font-sheet';
import BottomSheetheader from '@/components/rollingpaper/bottom-sheet/header';
import EmojiSkin from '@/components/rollingpaper/emoji-skin';
import ReactHelmet from '@/helmet';
import useSetHeader from '@/hooks/use-set-header';
import { findSvgByThemeName } from '@/lib/cake-decoration';
import { paperQueries } from '@/lib/query-factory';
import { ROLLINGPAPER_BG_MAP } from '@/lib/rolling-paper';
import { StyledBackdrop } from '@/pages/rollingpaper/list.style';
import {
  StyledCustomSheet,
  StyledRollingFormEmojiWrapper,
  StyledRollingFormWrapper,
  StyledSheetContentWrapper,
} from '@/pages/rollingpaper/message.style';
import { ColorName, FontNameWithoutAppleFont } from '@/styles/theme';

export default function MessageCreatePage() {
  const params = useParams();
  const location = useLocation();
  const { data: paper } = useQuery(paperQueries.detail(Number(params.id)));
  const [isEmojiSelectionPage, setisEmojiSelectionPage] = useState(true);
  const [isEmojiSheetOpen, setIsEmojiSheetOpen] = useState(false);
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState('');
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const Svg = findSvgByThemeName(activeEmoji);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFont, setActiveFont] =
    useState<FontNameWithoutAppleFont>('Cafe24Ssurround');
  const [activeColor, setActiveColor] = useState<ColorName>('white');
  const [content, setContent] = useState('');

  useSetHeader({
    title: isEmojiSelectionPage ? '편지 선택' : '편지 작성',
    bg: ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgColor,
    color: paper?.theme === 'animal' ? undefined : 'white',
  });

  const handleMessageSubmit = () => {
    if (isEmojiSelectionPage) {
      setisEmojiSelectionPage(false);
      setIsEmojiSheetOpen(false);
      setIsFontSheetOpen(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleOpenSheet = () => {
    if (isEmojiSelectionPage) {
      setIsEmojiSheetOpen(true);
    } else {
      setIsFontSheetOpen(true);
    }
  };

  useEffect(() => {
    if (isEmojiSelectionPage) {
      setActiveMenuIndex(0);
      setIsEmojiSheetOpen(true);
      setIsFontSheetOpen(false);
    }
  }, [isEmojiSelectionPage]);

  return (
    <StyledRollingFormWrapper>
      <StyledBackdrop
        bg={ROLLINGPAPER_BG_MAP[paper?.theme ?? 'animal'].bgUrl}
      />
      <StyledRollingFormEmojiWrapper
        isEmojiSelectionPage={isEmojiSelectionPage}
      >
        <EmojiSkin
          message={{
            font: activeFont,
            fontColor: activeColor,
            theme: activeEmoji,
          }}
        >
          {Svg && <Svg />}
          {activeEmoji && (
            <textarea
              disabled={isEmojiSelectionPage}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          )}
        </EmojiSkin>
      </StyledRollingFormEmojiWrapper>
      <StyledCustomSheet
        onCloseEnd={() => setIsButtonOpen(true)}
        detent="content-height"
        isOpen={isFontSheetOpen}
        onClose={() => setIsFontSheetOpen(false)}
        onOpenEnd={() => setIsButtonOpen(false)}
      >
        <Sheet.Container>
          <Sheet.Header>
            <BottomSheetheader />
          </Sheet.Header>
          <Sheet.Content>
            <StyledSheetContentWrapper>
              <FontSheet
                activeMenuIndex={activeMenuIndex}
                setActiveMenuIndex={setActiveMenuIndex}
              >
                {activeMenuIndex === 0 ? (
                  <FontList
                    activeFont={activeFont}
                    setActiveFont={setActiveFont}
                  />
                ) : (
                  <ColorList
                    theme={paper?.theme ?? 'animal'}
                    activeColor={activeColor}
                    setActiveColor={setActiveColor}
                  />
                )}
              </FontSheet>
              <Button onClick={handleMessageSubmit} disabled={!content.length}>
                작성완료
              </Button>
            </StyledSheetContentWrapper>
          </Sheet.Content>
        </Sheet.Container>
      </StyledCustomSheet>

      <StyledCustomSheet
        onOpenEnd={() => setIsButtonOpen(false)}
        onCloseEnd={() => setIsButtonOpen(true)}
        isOpen={isEmojiSheetOpen}
        onClose={() => setIsEmojiSheetOpen(false)}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header>
            <BottomSheetheader />
          </Sheet.Header>
          <Sheet.Content>
            <StyledSheetContentWrapper>
              <EmojiSheet
                activeEmoji={activeEmoji}
                setActiveEmoji={setActiveEmoji}
                theme={paper?.theme ?? 'animal'}
              />
              <Button onClick={handleMessageSubmit} disabled={!activeEmoji}>
                편지 선택하기
              </Button>
            </StyledSheetContentWrapper>
          </Sheet.Content>
        </Sheet.Container>
      </StyledCustomSheet>

      {isModalOpen && (
        <CreateMessageModal
          position={location.state.position}
          emoji={activeEmoji}
          color={activeColor}
          font={activeFont}
          contentType="rollingpaper"
          content={content}
          onCloseModal={() => setIsModalOpen(false)}
        />
      )}
      <BottomSheetButton
        isOpen={isButtonOpen}
        onOpen={handleOpenSheet}
        disabled={isEmojiSelectionPage ? !activeColor : !content}
        onClick={handleMessageSubmit}
      >
        {isEmojiSelectionPage ? '편지 선택하기' : '작성 완료'}
      </BottomSheetButton>
      <ReactHelmet title={'편지 작성 - 마니또'} />
    </StyledRollingFormWrapper>
  );
}
