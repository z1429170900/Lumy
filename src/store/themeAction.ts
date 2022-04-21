interface Action {
    type: string,
    theme: string
}

export interface ThemeType {
    theme: 'light' | 'dark'
}

export const setTheme = (theme: string) => {
    return {
        type: 'SET_THEME',
        theme
    }
}

export const theme = (state="light", action: Action) => {
    switch (action.type) {
        case 'SET_THEME':
            return action.theme
        default:
            return state
    }
}