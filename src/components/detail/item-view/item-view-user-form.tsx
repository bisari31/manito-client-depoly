import styled from '@emotion/styled';

import { getFontSizeAndWeight } from '../../../styles/mixins';

interface ItemViewUserFormProps {
  activeIndex: number;
  totalIndex: number;
  nickname?: string;
}

export default function ItemViewUserForm({
  activeIndex,
  totalIndex,
  nickname,
}: ItemViewUserFormProps) {
  return (
    <StyledWrapper>
      <StyledNicknameBox>
        <div>From</div>
        <div>{nickname}</div>
      </StyledNicknameBox>
      <StyledLengthBox>
        <div>
          <span>{activeIndex + 1}</span>
          <span>/{totalIndex}</span>
        </div>
      </StyledLengthBox>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 24px;
  justify-content: center;
`;
const StyledNicknameBox = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  div {
    color: ${({ theme }) => theme.colors['gray-900']};
    ${getFontSizeAndWeight('heading3', 'medium')};
  }
  div:nth-of-type(1) {
    margin-top: auto;
  }
  div:nth-of-type(2) {
    padding: 8px 0;
    text-align: right;
    border-bottom: ${({ theme }) => `1px dashed ${theme.colors['gray-800']}`};
    flex: 1;
  }
  align-items: center;
`;
const StyledLengthBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  div {
    padding: 4px 12px;
    border-radius: 99px;
    background-color: ${({ theme }) => theme.colors.white};
  }
  span {
    display: inline-block;
    ${getFontSizeAndWeight('heading4', 'regular')};
  }
  span:nth-of-type(1) {
    font-weight: 700;
    color: ${({ theme }) => theme.colors['gray-800']};
  }
  span:nth-of-type(2) {
    font-weight: 400;
    color: ${({ theme }) => theme.colors['gray-500']};
  }
`;
