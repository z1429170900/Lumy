import staticData from "./static"

export interface HeadTab {
    path: string, // 地址
    title: string, // 标题
    id: number // 主键
}

interface Action {
    type: string,
    headTab?: Array<HeadTab> | HeadTab,
    ids?: Array<number> | number,
    id?: number
}

export const setHeadTab = (headTab: Array<HeadTab>) => { // 设置标签项，直接全量替换
    return {
        type: 'SET_HEAD_TAB',
        headTab
    }
}

export const addHeadTab = (headTab: Array<HeadTab> | HeadTab) => { // 添加标签项
    return {
        type: 'ADD_HEAD_TAB',
        headTab
    }
}

export const removeHeadTab = (ids: Array<number> | number) => { // 清除指定的ids项
    return {
        type: 'REMOVE_HEAD_TAB',
        ids
    }
}

export const clearAllHeadTab = () => { // 清空所有项 返回[]
    return {
        type: 'CLEAR_ALL_HEAD_TAB'
    }
}

export const clearOtherHeadTab = (ids: Array<number> | number) => { // 只返回当前ids的项
    return {
        type: 'CLEAR_OTHER_HEAD_TAB',
        ids
    }
}

export const clearRightHeadTab = (id: number) => { // 返回当前及当前左侧的所有项
    return {
        type: 'CLEAR_RIGHT_HEAD_TAB',
        id
    }
}

function saveTabsInLocal(tabs: Array<HeadTab>) {
    localStorage.setItem('tabs', JSON.stringify(tabs))
    return tabs
}

function getSaveTabs():Array<HeadTab> {
    let tabs = localStorage.getItem('tabs');
    if (tabs) {
        tabs = JSON.parse(tabs);
    }
    return (tabs || []) as Array<HeadTab>
}

export const headTab = (state=getSaveTabs(), action: Action) => {
    let headTab = action.headTab;
    switch (action.type) {
        case 'SET_HEAD_TAB':
            return saveTabsInLocal(headTab as HeadTab[])
        case 'ADD_HEAD_TAB': 
            if (Object.prototype.toString.call(headTab) === '[object Array]') {
                headTab = (headTab as Array<HeadTab>).filter(item => {
                    return !state.some((stem:HeadTab) => item.path === stem.path)
                })
                return saveTabsInLocal([...state, ...<Array<HeadTab>>headTab])
            } else {
                if (state.some((stem:HeadTab) => (headTab as HeadTab).path === stem.path)) {
                    return state;
                }
                return saveTabsInLocal([...state, headTab] as HeadTab[])
            }
        case 'REMOVE_HEAD_TAB':
            if (typeof action.ids === 'number') {
                return saveTabsInLocal(state.filter((item:HeadTab) => item.id !== action.ids))
            } else {
                return saveTabsInLocal(state.filter((item:HeadTab) => (<Array<number>>action.ids).indexOf(item.id) === -1))
            }
        case 'CLEAR_ALL_HEAD_TAB':
            return saveTabsInLocal([])
        case 'CLEAR_OTHER_HEAD_TAB':
            // 清除 除ids组件内涉及id外其他所有tab
            if (typeof action.ids === 'number') {
                let present = state.find((item:HeadTab) => item.id === action.ids);
                return saveTabsInLocal(present ? [present] : []);
            } else {
                let presents = state.filter((item:HeadTab) => (action.ids as Array<number>).indexOf(item.id) !== -1);
                return saveTabsInLocal(presents);
            }
        case 'CLEAR_RIGHT_HEAD_TAB':
            let temp = [];
            for (let i=0; i<state.length; i++) {
                if (state[i].id !== action.id) {
                    temp.push(state[i]);
                } else {
                    temp.push(state[i]);
                    break;
                }
            }
            return saveTabsInLocal(temp)
        default:
            return state
    }
}

export function getNextPage(state: any, ids: Array<number> | number) {
    // 由于上下文中state并未更新 所以重新计算state
    let temp = []; // temp为重新计算的state
    if (typeof ids === 'number') {
        temp = state.filter((item:HeadTab) => item.id !== ids)
    } else {
        temp = state.filter((item:HeadTab) => (<Array<number>>ids).indexOf(item.id) === -1)
    }
    // 从历史记录中得出下一任地址，并将多余的历史记录删除
    for (let i=staticData.tabsHistory.length - 1; i>=0; i--) {
        let item = staticData.tabsHistory[i];
        if (temp.some((data:any) => data.path === item)) {
            staticData.tabsHistory = staticData.tabsHistory.slice(0, i + 1);
            return item;
        }
    }
    return temp[temp.length - 1] ? temp[temp.length - 1].path : null;
}