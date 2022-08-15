import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const AvatarState = atom({
  key: 'AvaterState',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

