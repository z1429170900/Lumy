import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { HeadTab } from '@/store/headTabAction'
import styleClass from './navigate.module.less'
import Tab from './tab';
import {
    EllipsisOutlined
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeHeadTab, getNextPage } from '@/store/headTabAction';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

declare var Sortable: any

interface NavigationTabInput {
    store: {headTab: Array<HeadTab>},
    removeHeadTab: (ids: Array<number> | number) => void,
}

function NavigationTab(e: NavigationTabInput) {
    // console.log(11) // 注意：redux触发和 naviage触发均会执行一次
    const tabBar = useRef(null);
    let headTab = e.store.headTab;
    let location = useLocation();
    let navigate = useNavigate();
    let pathname = location.pathname;
    function closeHandle (ids: Array<number> | number) {
        e.removeHeadTab(ids); // 删除对应的标签
        let path = getNextPage(headTab, ids);
        if (path) {
            navigate(path)
        } else {
            navigate('/home/main')
        }
    }
    useEffect(() => {
        Sortable.create(tabBar.current, {
            animation: 300,
            onEnd: (evt:any) => {
                // console.log(evt)
            }
        })
    }, [])
    return (
        <div className={styleClass['navigation-tab-bg']}>
            <div className={styleClass['navigation-tab-bar']} ref={tabBar}>
                <div className={styleClass['tab-box']}>
                    <Tab title="首页" main path='/home/main' active={pathname==='/home/main'}></Tab>
                    <div className={styleClass['tab-line']}></div>
                </div>
                <TransitionGroup component={null}>
                    {headTab.map(item => {
                        return <CSSTransition 
                            classNames="close"
                            timeout={500}
                            key={item.id}
                            onEnter={(el:HTMLElement) => {el.style.width = "0";el.style.minWidth = "0"}}
                            onEntering={(el:HTMLElement) => {el.style.width = "120px"}}
                            onEntered={(el:HTMLElement) => {el.style.width = "120px"}}
                            onExit={(el:HTMLElement) => {el.style.width = "120px"}}
                            onExiting={(el:HTMLElement) => {el.style.width = "0";el.style.minWidth = "0"}}
                            onExited={(el:HTMLElement) => {el.style.width = "0";el.style.minWidth = "0"}}
                        >
                            <div className={styleClass['tab-box']}>
                                <Tab title={item.title} path={item.path} active={pathname===item.path} close={closeHandle} id={item.id}></Tab>
                                <div className={styleClass['tab-line']}></div>
                            </div>
                        </CSSTransition>
                        
                    })}
                </TransitionGroup>
                
            </div>
            <div className={styleClass['navigation-tab-tool']}>
                <EllipsisOutlined />
            </div>
        </div>
    )
}

export default connect(
    (state: {headTab: Array<HeadTab>}) => {
        return {
            store: {
                headTab: state.headTab
            }
        }
    },
    dispatch => ({
        removeHeadTab: (ids: Array<number> | number) => dispatch(removeHeadTab(ids))
    })
)(NavigationTab)