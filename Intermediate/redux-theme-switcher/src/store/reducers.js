import { THEME_TYPE } from '../constants';

const initialState = {
    theme: THEME_TYPE.LIGHT
};

export const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'setTheme':
            return {
                ...state,
                theme: action.payload
            };
        default:
            return state;
    }
};