import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const ChannelState = atom({
  key: 'ChannelState',
  default: -1,
  effects_UNSTABLE: [persistAtom],
})