import { atom } from 'recoil';

export const isLoggedIn = atom({
    key: 'loggedInState',
    default: false,
});