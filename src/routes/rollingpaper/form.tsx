import { useEffect, useState } from 'react';
import { Sheet } from 'react-modal-sheet';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/common/button/buttons';
import MessageCreateModal from '../../components/modal/message-create-modal';
import BottomSheetButton from '../../components/rollingpaper/bottom-sheet/button';
import EmojiSheet from '../../components/rollingpaper/bottom-sheet/emoji-sheet/emoji-sheet';
import ColorList from '../../components/rollingpaper/bottom-sheet/font-sheet/color-list';
import FontList from '../../components/rollingpaper/bottom-sheet/font-sheet/font-list';
import FontSheet from '../../components/rollingpaper/bottom-sheet/font-sheet/font-sheet';
import BottomSheetheader from '../../components/rollingpaper/bottom-sheet/header';
import EmojiSkin from '../../components/rollingpaper/emoji-skin';
import { findEmojiSvgFromTheme } from '../../constants/emojis';
import { useMessageInfo, useSetHeader } from '../../hooks';
import { useEditMessage } from '../../queries/message';
import { ColorName, FontNameWithoutAppleFont } from '../../styles/theme';
import {
  StyledCustomSheet,
  StyledOverlayBackdrop,
  StyledRollingFormEmojiWrapper,
  StyledRollingFormWrapper,
  StyledSheetContentWrapper,
} from './form.style';
import { COLOR_BY_THEME } from './list';

export default function RollingpaperForm() {
  const messageInfo = useMessageInfo();
  const navigate = useNavigate();
  const isEditing = 'font' in messageInfo && messageInfo.type === 'edit';
  const isActiveFontTab = messageInfo.activeTab === 'font';
  const [isEmojiSheetOpen, setIsEmojiSheetOpen] = useState(false);
  const [isFontSheetOpen, setIsFontSheetOpen] = useState(false);
  const [activeEmoji, setActiveEmoji] = useState(
    isEditing ? messageInfo.theme : '',
  );
  const [isButtonOpen, setIsButtonOpen] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);
  const emoji = findEmojiSvgFromTheme(activeEmoji);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFont, setActiveFont] = useState<FontNameWithoutAppleFont>(
    isEditing ? messageInfo.font : 'Cafe24Ssurround',
  );
  const [activeColor, setActiveColor] = useState<ColorName>(
    isEditing ? messageInfo.fontColor : 'white',
  );
  const [content, setContent] = useState(isEditing ? messageInfo.content : '');
  useSetHeader({
    title: messageInfo.type === 'create' ? '편지 작성' : '수정하기',
    bg: COLOR_BY_THEME[messageInfo.paperTheme],
    color: messageInfo.paperTheme === 'animal' ? undefined : 'white',
  });

  const { mutate } = useEditMessage(messageInfo.paperId);
  const handleMessageSubmit = () => {
    if (isEditing) {
      return mutate({
        content,
        font: activeFont,
        fontColor: activeColor,
        id: messageInfo.id,
      });
    }
    if (isActiveFontTab) return setIsModalOpen(true);
    navigate(`${messageInfo.pathname}?activeTab=font`, {
      state: messageInfo,
    });
    setIsEmojiSheetOpen(false);
    setIsFontSheetOpen(true);
  };

  const checkTextareaDisabled = () => {
    if (isEditing || isActiveFontTab) return false;
    return true;
  };

  const handleOpenSheet = () => {
    if (isEditing || isActiveFontTab) setIsFontSheetOpen(true);
    else setIsEmojiSheetOpen(true);
  };

  const checkButtonDisable = () => {
    if (isEditing || isActiveFontTab) {
      return !content;
    }
    return !activeEmoji;
  };

  useEffect(() => {
    if (!isActiveFontTab && !isEditing) {
      setActiveMenuIndex(0);
      setIsEmojiSheetOpen(true);
      setIsFontSheetOpen(false);
    }
  }, [isEditing, isActiveFontTab]);

  useEffect(() => {
    if (isEditing) setIsFontSheetOpen(true);
  }, [isEditing]);

  return (
    <StyledRollingFormWrapper>
      <StyledOverlayBackdrop themeName={messageInfo.paperTheme} />
      <StyledRollingFormEmojiWrapper
        isEmojiTab={!isActiveFontTab && !isEditing}
      >
        <EmojiSkin
          message={{
            font: activeFont,
            fontColor: activeColor,
            theme: emoji?.name,
          }}
        >
          {emoji && <emoji.svg />}
          {activeEmoji && (
            <textarea
              disabled={checkTextareaDisabled()}
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
                    theme={messageInfo.paperTheme}
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
                theme={messageInfo.paperTheme}
              />
              <Button onClick={handleMessageSubmit} disabled={!activeEmoji}>
                {/* <Button onClick={handleNextSheet} disabled={!activeEmoji}> */}
                편지 선택하기
              </Button>
            </StyledSheetContentWrapper>
          </Sheet.Content>
        </Sheet.Container>
      </StyledCustomSheet>

      {isModalOpen && (
        <MessageCreateModal
          color={activeColor}
          font={activeFont}
          isOpen={isModalOpen}
          content={content}
          setIsOpen={setIsModalOpen}
          messageInfo={{
            emoji: activeEmoji,
            paperId: messageInfo.paperId,
            position: messageInfo.position,
          }}
        />
      )}
      <BottomSheetButton
        isOpen={isButtonOpen}
        onOpen={handleOpenSheet}
        disabled={checkButtonDisable()}
        onClick={handleMessageSubmit}
      >
        {isActiveFontTab || isEditing ? '작성 완료' : '편지 선택하기'}
      </BottomSheetButton>
    </StyledRollingFormWrapper>
  );
}
