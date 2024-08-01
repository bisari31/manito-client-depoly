const theme = {
  fontSize: {
    heading1: '24px',
    heading2: '20px',
    heading3: '18px',
    heading4: '16px',
    body1: '14px',
    body2: '12px',
    body3: '11px',
  },
  fontWeight: {
    bold: 700,
    medium: 500,
    regular: 400,
  },
  fontFamily: {
    SpoqaHanSansNeo: 'SpoqaHanSansNeo',
    AppleSDGothicNeo: 'AppleSDGothicNeo',
    Cafe24Simplehae: 'Cafe24Simplehae',
    Cafe24Ssurround: 'Cafe24Ssurround',
    Galmuri11: 'Galmuri11',
    NanumPen: 'NanumPen',
    PyeongChangPeace: 'PyeongChangPeace',
  },
  sizes: {
    mobile: '480px',
    padding: '24px',
    header: '64px',
    paddingTop: '48px',
    paddingBottom: '40px',
    calcHeader: 'calc(100% - 64px)',
  },
  colors: {
    'powderBlue-50': '#F7F8FB',
    'powderBlue-100': '#EEF2FB',
    'powderBlue-200': '#D7E3FD',
    'powderBlue-300': '#CCDAFD',
    'powderBlue-400': '#C2D3FF',
    'powderBlue-500': '#B6CCFE',
    'powderBlue-600': '#ABC3FF',
    'powderBlue-700': '#88A8F8',
    'powderBlue-800': '#6C94F9',
    'powderBlue-900': '#5383FB',
    'gray-50': 'F9F9F9',
    'gray-100': '#F5F5F5',
    'gray-200': '#EEEEEE',
    'gray-300': '#E0E0E0',
    'gray-400': '#BDBDBD',
    'gray-500': '#9E9E9E',
    'gray-600': '#757575',
    'gray-700': '#616161',
    'gray-800': '#424242',
    'gray-900': '#212121',
    'space-400': '#4E86F4',
    'space-500': '#3177FF',
    'space-600': '#0D5FFF',
    'space-700': '#0E374D',
    'green-50': '#EDF7EB',
    'olive-700': '#638C18',
    'olive-800': '#4B7300',
    'teal-700': '#268A50',
    'teal-800': '#187A41',
    'teal-900': '#16592D',
    'animal-orange-100': '#F07605',
    'animal-orange-200': '#FF4C00',
    'animal-red-brown-100': '#924230',
    'animal-red-brown-200': '#622517',
    'animal-brown-100': '#58390B',
    'animal-gray-800': '#424242',
    white: '#FFFFFF',
    black: '#000000',
    kakao: '#FEE500',
    error: '#F04747',
  },
};
export type FontName = keyof ThemeType['fontFamily'];
export type FontNameWithoutAppleGothic = Exclude<
  keyof ThemeType['fontFamily'],
  'AppleSDGothicNeo'
>;
export type ThemeType = typeof theme;
export type ColorName = keyof ThemeType['colors'];

export default theme;
