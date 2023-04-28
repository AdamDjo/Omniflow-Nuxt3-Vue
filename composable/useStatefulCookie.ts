import { useCookie, useState, watch } from '#imports';
import {CookieRef} from "#app";


// Make cookie use state across app
export default function useStatefulCookie<T = string> (name: string): CookieRef<T> {
    const cookie = useCookie<T>(name);
    const state = useState<T>(name, () => cookie.value);

    watch(state, () => { cookie.value = state.value; }, { deep: true });

    return state;
}