import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Trash } from '@/assets/svg/icons';
import DeleteModal from '@/components/modal/delete-modal';
import { CATEGORY_MAP } from '@/lib/rolling-paper';
import { useDeletePaper } from '@/mutations/paper';
import routes from '@/routes';
import { getFontSizeAndWeight } from '@/styles/mixins';
import theme from '@/styles/theme';

interface MyPaperItemProps {
  paper: Paper;
}

export default function MyPaperItem({ paper }: MyPaperItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useDeletePaper();

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <StyledItem>
      <Link
        to={routes[CATEGORY_MAP[paper.category]].list(paper.id)}
        state={routes.my.default}
      >
        <span>{paper.title}</span>
        <div>
          <span>{dayjs(paper.regDateTime).format('YYYY.MM.DD')}</span>
          <button type="button" onClick={handleButtonClick}>
            <Trash width={24} height={24} fill={theme.colors['gray-700']} />
          </button>
        </div>
      </Link>
      {isModalOpen && (
        <DeleteModal
          isMessageDelete={false}
          handler={() => mutate(paper.id)}
          setIsOpen={setIsModalOpen}
        />
      )}
    </StyledItem>
  );
}

export const StyledItem = styled.li`
  a {
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors['powderBlue-50']};
    border: ${({ theme }) => `1px solid ${theme.colors['powderBlue-100']}`};
    align-items: center;
    display: flex;
    padding: 18px 16px;

    & > span {
      margin-right: 8px;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      ${getFontSizeAndWeight('heading4', 'medium')}
      color: ${({ theme }) => theme.colors['gray-800']};
    }
    div {
      display: flex;
      align-items: center;
      gap: 8px;
      span {
        color: ${({ theme }) => theme.colors['gray-500']};
        ${getFontSizeAndWeight('body1', 'regular')};
      }
      button {
        padding: 4px;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.2);
        background-color: ${({ theme }) => theme.colors.white};
        border-radius: 4px;
      }
    }
  }
`;
