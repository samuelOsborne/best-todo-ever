import { Session } from '@supabase/supabase-js';
import { atom } from 'recoil';

export const sessionAtom = atom({
    key: 'sessionAtom',
    default: {} as Session | null
});