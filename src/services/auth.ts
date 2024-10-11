import { apiRequesterWithoutToken } from '@/services';

export const getAccessToken = async (code: string | null) => {
  if (!code) return null;
  const { data } = await apiRequesterWithoutToken.post<
    DeatultResponse<AccessToken & User>
  >('/login/oauth/kakao', {
    code,
  });
  return data;
};
