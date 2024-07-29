import { Button } from '../components/common/buttons';
import NameForm from '../components/common/name-form';
import { nicknameMaxLength } from '../constants/regexPatterns';
import { useNameForm } from '../hooks';
import { useNicknameChange, useUserQuery } from '../queries/users';
import toastStore from '../stores/toastStore';
import { StyledAvartarWrapper, StyledRenameWrapper } from './rename.style';

export default function Rename() {
  const { data } = useUserQuery();
  const toast = toastStore();
  const { mutate, isPending } = useNicknameChange(true);
  const { handleNameChange, handleNameReset, isError, name, nameRef } =
    useNameForm('nickname');

  const handleNicknameChange = () => {
    mutate(name);
  };

  return (
    <StyledRenameWrapper>
      <StyledAvartarWrapper>
        <button>
          <img src={data?.data?.profileImage} alt="avartar" />
        </button>
        <button onClick={() => toast.add('sdfdsfsfs')}>기본프로필로변경</button>
      </StyledAvartarWrapper>
      <h3>이름</h3>
      <NameForm
        ref={nameRef}
        isError={isError}
        maxLength={nicknameMaxLength}
        value={name}
        onChange={handleNameChange}
        onClick={handleNameReset}
      >
        {null}
      </NameForm>
      <div>
        <Button
          onClick={handleNicknameChange}
          hasMarginBottom
          disabled={isError || !name.length || isPending}
        >
          수정하기
        </Button>
      </div>
    </StyledRenameWrapper>
  );
}
