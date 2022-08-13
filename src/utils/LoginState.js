import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
})

export const LoginEmail = atom(
  {
    key: 'LoginEmail',
    default: "",
    effects_UNSTABLE: [persistAtom],
  }
)