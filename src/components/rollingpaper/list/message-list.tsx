import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MessageItem from '@/components/rollingpaper/list/message-item';
import { MyMessageListSkeleton } from '@/components/skeletons/skeletons';
import { messageQueries } from '@/lib/query-factory';
import {
  useMessageActions,
  useMessageList,
} from '@/stores/message-index-store';

export default function MessageList() {
  const params = useParams();
  const { data, isLoading } = useQuery(messageQueries.paper(Number(params.id)));
  const messageList = useMessageList();
  const messageActions = useMessageActions();
  useEffect(() => {
    messageActions.snycList(data);
  }, [data, messageActions]);

  if (isLoading) return <MyMessageListSkeleton />;

  return (
    <StyledList>
      {messageList.map((message, i) => (
        <MessageItem position={i} key={i} message={message} />
      ))}
    </StyledList>
  );
}

export const StyledList = styled.ul`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, 1fr);
`;
