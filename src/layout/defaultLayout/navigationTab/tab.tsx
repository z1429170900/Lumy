import React from 'react'
import PropTypes from 'prop-types'
import { useLocation, useNavigate } from 'react-router-dom'
import styleClass from './navigate.module.less'
import {
    CloseOutlined,
    SlackOutlined,
    CarOutlined,
    HomeOutlined
} from '@ant-design/icons';
import staticData from '@/store/static';

interface TabInput {
    title: string,
    path: string,
    main?: boolean,
    active?: boolean,
    id?: number,
    close?: (ids: Array<number> | number) => void | undefined
}

type iconsProps = {
    [propName: string]: JSX.Element | undefined; // 关键
}

// 对应的地址配置icon
const iconMap:iconsProps = {
    "/home/gameStatistic": <CarOutlined />,
    "/home/userStatistic": <CarOutlined />,
    "/home/account": <CarOutlined />,
    "/home/role": <CarOutlined />,
    "/home/main": <HomeOutlined />
}

function getPath(path: string) { // 获取除了参数的路径
    return path.split("?")[0]
}

function Tab(e:TabInput) {
    const navigate = useNavigate();
    const location = useLocation();
    function tabClickHandle(event:any) {
        if (event.button === 0) {
            if (location.pathname === getPath(e.path)) { // 点击相同的标签不做处理
                return;
            }
            // 将path存下来 历史记录
            staticData.tabsHistory.push(e.path);
            //
            navigate(e.path);
        }
    }
    // 点击关闭
    function closeHandle(event:any) {
        event.stopPropagation();
        e.close && e.close(e.id || 1); // 调用父组件的close方法
    }

    // 右键标签执行
    function tabContextMenu(event:any) {
        event.preventDefault();
        staticData.createTool?.createTabMenu({x: event.clientX, y: event.clientY, tabId: e.id || null})
    }

    return (
        <div onMouseDown={tabClickHandle} onContextMenu={tabContextMenu} className={`${styleClass['tab-item']} ${e.active ? styleClass['tab-active'] : null} ${e.main ? styleClass['tab-main'] : null}`}>
            <div className={styleClass['fall-bg']}></div>
            <div className={styleClass['tab-item-show-box']}>
                <span className={styleClass['item-icon']}>
                    {iconMap[getPath(e.path)] || <SlackOutlined />}
                </span>
                <div className={styleClass['tab-content']}>
                    <span className={styleClass['item-title']}>{ e.title }</span>
                </div>
                {!e.main ? <div className={styleClass['close']} onClick={closeHandle} onContextMenu={(e:any) => e.stopPropagation()}><div className={styleClass['close-bg']}><CloseOutlined /></div></div> : null}
            </div>
        </div>
    )
}

Tab.propTypes = {
    path: PropTypes.string.isRequired, // 地址
    title: PropTypes.string.isRequired, // 标题
    main: PropTypes.bool,
    active: PropTypes.bool,
    close: PropTypes.func
}

export default Tab