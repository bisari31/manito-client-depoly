import { useParams } from 'react-router-dom';

import { Modal } from '@/components/modal';
import useNameForm from '@/hooks/use-name-form';
import { useCreateMessage } from '@/mutations/message';
import { useModalIndex } from '@/stores/modal-store';
import theme, { ColorName, FontNameWithoutAppleFont } from '@/styles/theme';

export type Content = 'cake' | 'rollingpaper';

interface CreateMessageModalProps {
  onCloseModal: () => void;
  content: string;
  contentType: Content;
  font: FontNameWithoutAppleFont;
  color: ColorName;
  emoji: string;
  position: number;
}

export default function CreateMessageModal({
  onCloseModal,
  content,
  contentType,
  color,
  font,
  emoji,
  position,
}: CreateMessageModalProps) {
  const params = useParams();
  const activeModalIndex = useModalIndex();
  const { mutate, isPending } = useCreateMessage(
    Number(params.id),
    contentType,
  );
  const {
    handleNameChange,
    handleNameReset,
    isError,
    name: nickname,
    nameRef: nicknameRef,
  } = useNameForm('nickname');

  const handleMessageSubmit = () => {
    mutate({
      font,
      content: content,
      fontColor: color,
      position,
      theme: emoji,
      isPublic: activeModalIndex === 0 ? 'Y' : 'N',
      paperId: Number(params.id),
      anonymous: activeModalIndex === 1 ? nickname : '',
    });
  };

  return (
    <Modal onClick={onCloseModal}>
      <Modal.RadioForm
        handleNameChange={handleNameChange}
        handleNameReset={handleNameReset}
        isError={isError}
        nickname={nickname}
        ref={nicknameRef}
      />
      <Modal.Buttons>
        <Modal.Button
          css={{ border: `1px solid ${theme.colors['gray-300']}` }}
          onClick={onCloseModal}
        >
          닫기
        </Modal.Button>
        <Modal.Button
          isPending={isPending}
          isActionBtn
          css={{
            backgroundColor: theme.colors['gray-900'],
            color: theme.colors.white,
          }}
          onClick={handleMessageSubmit}
        >
          작성하기
        </Modal.Button>
      </Modal.Buttons>
    </Modal>
  );
}
