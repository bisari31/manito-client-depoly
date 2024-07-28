import { AddCircle, MenuDotsSquare, Trash } from '../../assets/svg/icons';
import emojis from '../../constants/emojis';
import { fonts } from '../../constants/fonts';
import { ThemeKey } from '../../constants/theme-list';
import { useDeleteMessage } from '../../queries/message';
import { usePaperDetailQuery } from '../../queries/paper';
import { useUserQuery } from '../../queries/users';
import { Message } from '../../types/message';
import {
  StyledDotsButton,
  StyledEmptySvg,
  StyledItem,
  StyledMessageBox,
  StyledMessageItem,
  StyledTrashButton,
} from './message-item.style';

export interface MessageItemProps {
  onMessageClick: () => void;
  onBottomSheetOpen: (status: boolean) => void;
  message: Message | null | Pick<Message, 'theme'>;
}
export default function MessageItem({
  onMessageClick,
  onBottomSheetOpen,
  message,
}: MessageItemProps) {
  const { data: userData } = useUserQuery();
  const { data: PaperDetailData } = usePaperDetailQuery();
  const id = message && 'content' in message ? message.id : 0;
  const { mutate } = useDeleteMessage({
    paperId: PaperDetailData?.data?.id,
    meesageId: id,
  });
  const EmojiSvg = emojis[PaperDetailData?.data?.theme as ThemeKey]?.find(
    (item) => item.name === message?.theme,
  )?.svg;
  const handleMessageDelete = (id?: number) => {
    if (id) mutate(id);
  };

  return PaperDetailData?.data && message ? (
    'userId' in message ? (
      <StyledMessageItem isServerData>
        <StyledDotsButton type="button" onClick={() => console.log('sdf')}>
          <MenuDotsSquare />
        </StyledDotsButton>
        {message.userId === userData?.data?.id && (
          <StyledTrashButton
            type="button"
            onClick={() => handleMessageDelete(message.id)}
          >
            <Trash />
          </StyledTrashButton>
        )}
        {EmojiSvg ? <EmojiSvg /> : <StyledEmptySvg />}
        <StyledMessageBox
          color={message.fontColor}
          font={fonts.find((font) => font.name === message.font)}
        >
          {message.content}
        </StyledMessageBox>
      </StyledMessageItem>
    ) : (
      <StyledMessageItem
        onClick={() => onBottomSheetOpen(true)}
        isServerData={false}
      >
        {EmojiSvg ? <EmojiSvg /> : <StyledEmptySvg />}
      </StyledMessageItem>
    )
  ) : (
    <StyledItem>
      <button type="button" onClick={onMessageClick}>
        <AddCircle />
      </button>
    </StyledItem>
  );
}