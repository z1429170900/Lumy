import { combineReducers } from 'redux'
import { theme } from './themeAction'
import { headTab } from './headTabAction'

export default combineReducers({
    theme,
    headTab
})