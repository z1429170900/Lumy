import React from 'react'
import styleClass from './tabTextMenu.module.less'
import {store} from '@/routes/routeMerge'
import {removeHeadTab, clearOtherHeadTab, clearAllHeadTab, clearRightHeadTab} from '@/store/headTabAction'

interface TabTextMenuInput {
    tabId: number | null
}

function TabTextMenu(e: TabTextMenuInput) {
    function refreshTab() {

    }
    
    function closeThisTab() {
        let tabId = e.tabId;
        tabId && store.dispatch(removeHeadTab(tabId))
    }
    
    function closeAllOtherTab() {
        let tabId = e.tabId;
        tabId ? store.dispatch(clearOtherHeadTab(tabId)) : store.dispatch(clearAllHeadTab()); // 为空表示首页 则关闭所有
    }
    
    function closeAllRightTab() {
        let tabId = e.tabId;
        tabId ? store.dispatch(clearRightHeadTab(tabId)) : store.dispatch(clearAllHeadTab()); // 为空表示首页 则关闭所有
    }
    return (
        <div className={styleClass['tab-text-menu']}>
            <ul>
                <li onClick={refreshTab}>刷新当前标签页</li>
                <li onClick={closeThisTab} className={e.tabId ? "" : styleClass['disabled']}>关闭当前标签页</li>
                <li onClick={closeAllOtherTab}>关闭其他标签页</li>
                <li onClick={closeAllRightTab}>关闭右侧标签页</li>
            </ul>
        </div>
    )
}

export default TabTextMenu