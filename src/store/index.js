import { createStore } from 'vuex';
import { authToArray } from '@/utils/auth';
import navList from '@/assets/navList.json';

export const store = createStore({
    state() {
        return {
            userData: {}
        };
    },
    mutations: {
        SET_USER_DATA(state, data) {
            state.userData = data;
        }
    },
    getters: {
        auth(state) {
            const auth = { ...state.userData?.auth };
            for (const [key, value] of Object.entries(auth)) {
                auth[key] = authToArray(value);
            }
            return auth;
        },
        menu(state) {
            const auth = { ...state.userData?.auth };
            for (const [key, value] of Object.entries(auth)) {
                auth[key] = authToArray(value);
            }
            return navList.filter(item => auth?.[item.icon]?.includes(1)) || [];
        }
    }
});
