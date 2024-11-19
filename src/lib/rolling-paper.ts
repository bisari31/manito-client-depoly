import { FunctionComponent, SVGAttributes } from 'react';

import {
  AnimalBgOriginal,
  AnimalBgThumbnail,
  NatureBgOriginal,
  NatureBgThumbnail,
  SpaceBgOriginal,
  SpaceBgThumbnail,
} from '@/assets/imgs';
import {
  AnimalCatPawsCircleLetter,
  AnimalCatPawsCloverLetter,
  AnimalCatPawsSquareLetter,
  AnimalCatSquareLetter,
  AnimalDogCatCircleLetter,
  AnimalDogCatCloverLetter,
  AnimalDogCatCloverTextLetter,
  AnimalDogCircleLetter,
  AnimalDogPawsCircleLetter,
  AnimalDogPawsCloverLetter,
  AnimalDogPawsSquareLetter,
  AnimalDogSquareLetter,
  NatureCircle1,
  NatureCircle2,
  NatureCircle3,
  NatureCircle4,
  NatureClover1,
  NatureClover2,
  NatureClover3,
  NatureClover4,
  NatureSquare1,
  NatureSquare2,
  NatureSquare3,
  NatureSquare4,
  SpaceCircle,
  SpaceCircleMoon,
  SpacePlanetCircle,
  SpacePlanetCircleCloud,
  SpacePlanetSquare,
  SpacePlanetSquareMoon,
  SpacePlanetStar,
  SpacePlanetStarRight,
  SpaceSquare,
  SpaceStarBright,
  SpaceTableclothPolygon,
  SpaceTableclothPolygonBright,
} from '@/assets/svg/emoji';
import { ColorName } from '@/styles/theme';
import { Message } from '@/types/message';

const ROLLING_THEME_NAMES: RollingThemeName[] = ['nature', 'space', 'animal'];

export const CATEGORY_MAP: Record<Category, CategoryLowerCase> = {
  CAKE: 'cake',
  ROLLING_PAPER: 'rollingpaper',
  TREASURE: 'treasure',
};

export const ROLLINGPAPER_BG_MAP: Record<
  RollingThemeName,
  { bgColor: ColorName; bgUrl: string }
> = {
  animal: { bgColor: 'white', bgUrl: AnimalBgOriginal },
  space: { bgColor: 'powderBlue-900', bgUrl: SpaceBgOriginal },
  nature: { bgColor: 'powderBlue-800', bgUrl: NatureBgOriginal },
};

export const getRollingThemeName = (
  message: Message<unknown>,
): RollingThemeName | undefined => {
  const messageTheme = message.theme.toLowerCase();
  return ROLLING_THEME_NAMES.find((name) => messageTheme.includes(name));
};

export const ROLLINGPAPER_THEMES: Theme[] = [
  {
    themeKor: '우주',
    themeEng: 'space',
    img: SpaceBgThumbnail,
  },
  {
    themeKor: '자연',
    themeEng: 'nature',
    img: NatureBgThumbnail,
  },
  {
    themeKor: '멍냥',
    themeEng: 'animal',
    img: AnimalBgThumbnail,
  },
];

export const ROLLINGPAPER_EMOJI_MAP: {
  [key in RollingThemeName]: {
    name: string;
    svg: FunctionComponent<SVGAttributes<SVGElement>>;
  }[];
} = {
  nature: [
    {
      name: 'NatureCircle1',
      svg: NatureCircle1,
    },
    {
      name: 'NatureCircle2',
      svg: NatureCircle2,
    },
    {
      name: 'NatureCircle3',
      svg: NatureCircle3,
    },
    {
      name: 'NatureCircle4',
      svg: NatureCircle4,
    },
    {
      name: 'NatureClover1',
      svg: NatureClover1,
    },
    {
      name: 'NatureClover2',
      svg: NatureClover2,
    },
    {
      name: 'NatureClover3',
      svg: NatureClover3,
    },
    {
      name: 'NatureClover4',
      svg: NatureClover4,
    },
    {
      name: 'NatureSquare1',
      svg: NatureSquare1,
    },
    {
      name: 'NatureSquare2',
      svg: NatureSquare2,
    },
    {
      name: 'NatureSquare3',
      svg: NatureSquare3,
    },
    {
      name: 'NatureSquare4',
      svg: NatureSquare4,
    },
  ],
  space: [
    {
      name: 'SpaceSquare',
      svg: SpaceSquare,
    },
    {
      name: 'SpacePlanetSquare',
      svg: SpacePlanetSquare,
    },
    {
      name: 'SpacePlanetSquareMoon',
      svg: SpacePlanetSquareMoon,
    },
    {
      name: 'SpaceStarBright',
      svg: SpaceStarBright,
    },
    {
      name: 'SpacePlanetCircle',
      svg: SpacePlanetCircle,
    },
    {
      name: 'SpacePlanetCircleCloud',
      svg: SpacePlanetCircleCloud,
    },
    {
      name: 'SpaceCircle',
      svg: SpaceCircle,
    },
    {
      name: 'SpaceCircleMoon',
      svg: SpaceCircleMoon,
    },
    {
      name: 'SpacePlanetStarRight',
      svg: SpacePlanetStarRight,
    },
    {
      name: 'SpacePlanetStar',
      svg: SpacePlanetStar,
    },
    {
      name: 'SpaceTableclothPolygon',
      svg: SpaceTableclothPolygon,
    },
    {
      name: 'SpaceTableclothPolygonBright',
      svg: SpaceTableclothPolygonBright,
    },
  ],
  animal: [
    {
      name: 'AnimalDogCircleLetter',
      svg: AnimalDogCircleLetter,
    },
    {
      name: 'AnimalDogCatCircleLetter',
      svg: AnimalDogCatCircleLetter,
    },
    {
      name: 'AnimalDogPawsCircleLetter',
      svg: AnimalDogPawsCircleLetter,
    },
    {
      name: 'AnimalCatPawsCircleLetter',
      svg: AnimalCatPawsCircleLetter,
    },
    {
      name: 'AnimalCatSquareLetter',
      svg: AnimalCatSquareLetter,
    },
    {
      name: 'AnimalDogPawsSquareLetter',
      svg: AnimalDogPawsSquareLetter,
    },
    {
      name: 'AnimalDogSquareLetter',
      svg: AnimalDogSquareLetter,
    },
    {
      name: 'AnimalCatPawsSquareLetter',
      svg: AnimalCatPawsSquareLetter,
    },
    {
      name: 'AnimalCatPawsCloverLetter',
      svg: AnimalCatPawsCloverLetter,
    },
    {
      name: 'AnimalDogPawsCloverLetter',
      svg: AnimalDogPawsCloverLetter,
    },
    {
      name: 'AnimalDogCatCloverLetter',
      svg: AnimalDogCatCloverLetter,
    },
    {
      name: 'AnimalDogCatCloverTextLetter',
      svg: AnimalDogCatCloverTextLetter,
    },
  ],
};
