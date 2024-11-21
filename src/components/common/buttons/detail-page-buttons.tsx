import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/common/buttons/buttons';
import DeleteModal from '@/components/modal/delete-modal';
import { userQueries } from '@/lib/query-factory';
import { useDeleteMessage } from '@/mutations/message';
import routes from '@/routes';
import theme from '@/styles/theme';
import { Message } from '@/types/message';

interface DetailMessageButtonsProps {
  message: Message<UserIdAndNickname>;
  category: CategoryLowerCase;
  paperAuthorId: number | undefined;
}

export default function DetailPageBottomButtons({
  message,
  category,
  paperAuthorId,
}: DetailMessageButtonsProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: user } = useQuery(userQueries.detail());
  const { mutate } = useDeleteMessage();

  const isPaperAuthor = user && user?.id === paperAuthorId;
  const isMessageAuthor = user && message.user?.id === user?.id;

  return (
    <StyledDetailMessageButtons>
      <Button
        css={{
          background: theme.colors.white,
          color: theme.colors.black,
          border: `1px solid ${theme.colors['gray-300']}`,
        }}
        onClick={() =>
          navigate(routes[category].list(message.paperId), { replace: true })
        }
      >
        닫기
      </Button>
      {isMessageAuthor && (
        <Button
          css={{ background: theme.colors['powderBlue-900'] }}
          onClick={() =>
            navigate(routes[category].messageEdit(message?.paperId), {
              state: { id: message.id },
            })
          }
        >
          수정
        </Button>
      )}
      {(isMessageAuthor || isPaperAuthor) && (
        <Button css={{}} onClick={() => setIsModalOpen(true)}>
          삭제
        </Button>
      )}
      {isModalOpen && (
        <DeleteModal
          message="편지"
          setIsOpen={setIsModalOpen}
          onDelete={() => mutate(message?.id)}
        />
      )}
    </StyledDetailMessageButtons>
  );
}

const StyledDetailMessageButtons = styled.div`
  display: flex;
  position: relative;
  z-index: 50;
  gap: 8px;
`;
