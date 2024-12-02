import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';

import { EditSquare, Trash } from '@/assets/svg/icons';
import DeleteModal from '@/components/modal/delete-modal';
import RollingpaperEmojiSkin from '@/components/rollingpaper/emoji-skin';
import {
  StyledEditButton,
  StyledMessageItem,
  StyledTrashButton,
} from '@/components/rollingpaper/list/item.style';
import { findImgByThemeName } from '@/lib/common';
import { useDeleteMessage } from '@/mutations/message';
import routes from '@/routes';
import theme from '@/styles/theme';
import { Message } from '@/types/message';

interface MyMessageItemProps {
  message: Message<User>;
  activeCagegory: RouteContentType;
}
export default function MyMessageItem({
  message,
  activeCagegory,
}: MyMessageItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useDeleteMessage();
  const navigate = useNavigate();

  const handleEditMessage = () => {
    navigate(routes[activeCagegory].messageEdit(message.paperId), {
      state: {
        id: message.id,
      },
    });
  };

  const handleViewDetailItem = async () => {
    navigate({
      pathname: routes[activeCagegory].detail(message.paperId),
      search: createSearchParams({ id: String(message.id) }).toString(),
    });
  };

  return (
    <StyledMessageItem isServerData>
      <StyledEditButton type="button" onClick={handleEditMessage}>
        <EditSquare width={24} height={24} fill={theme.colors['gray-600']} />
      </StyledEditButton>
      <StyledTrashButton type="button" onClick={() => setIsModalOpen(true)}>
        <Trash width={24} height={24} fill={theme.colors['gray-700']} />
      </StyledTrashButton>
      <RollingpaperEmojiSkin
        onClick={handleViewDetailItem}
        paperId={message.paperId}
        isSmall
        message={message}
      >
        <img
          width={200}
          height={200}
          src={findImgByThemeName(message.theme)}
          alt={message.theme}
        />
        <p>{activeCagegory === 'rollingpaper' && message.content}</p>
      </RollingpaperEmojiSkin>
      {isModalOpen && (
        <DeleteModal
          message="편지"
          setIsOpen={setIsModalOpen}
          onDelete={() => mutate(message.id)}
        />
      )}
    </StyledMessageItem>
  );
}
