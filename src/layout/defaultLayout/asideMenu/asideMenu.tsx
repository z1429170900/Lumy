import React, { useEffect, useState } from 'react';
import {Menu, Button } from 'antd';
import {
    AppstoreOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    MailOutlined,
} from '@ant-design/icons';
import styleClass from './asideMenu.module.less';
import { connect } from 'react-redux';
import { ThemeType } from '@/store/themeAction';
import { useNavigate, useLocation } from 'react-router-dom';
import { addHeadTab, HeadTab } from '@/store/headTabAction';
import { getPath } from '@/utils/public.tool';

interface Store {
    theme: ThemeType["theme"]
}

interface AsideMneuInput {
    store: Store,
    addHeadTab: (headTab:Array<HeadTab> | HeadTab) => void
}

const { SubMenu } = Menu;

// 注意 菜单顺序变化时，这里也需要对应的更新 ★★★★★
// Menu.Item菜单项对应的展开项SubMenu，用于设置defaultOpenKeys(menu组件的属性)
const menuMap:{[propName: string]: Array<string>} = {
    "gameStatistic": ["sub1"],
    "userStatistic": ["sub1"],
    "account": ["sub2"],
    "role": ["sub2"],
    "": []
}
let tempPath:string|null = null;
function AsideMenu(e:AsideMneuInput) {
    const navigate = useNavigate();
    const location = useLocation();
    const path = getPath(location.pathname);
    const subList = menuMap[path] || [];
    const [collapsed, setCollapsed] = useState(false); // menu是否收缩 true为收缩
    const [openKeys, setOpenKeys] = useState(subList); // 将激活的项展开
    // 什么时候判断并激活？
    // ...
    // 答案：当路由变化时触发 激活前先判断
    if (tempPath && tempPath !== path) { // 路由发生变化
        // 将未激活的激活
        let origin = [...openKeys];
        subList.forEach(item => {
            if (origin.indexOf(item) === -1) {
                origin.push(item);
            }
        })
        setOpenKeys(origin)
    }
    tempPath = path;

    // 菜单项点击时触发(Menu.Item)
    function itemClick(item:any) {
        let path = "/home/" + item.key;
        navigate(path); // 跳转
        // 保存导航标签到redux
        e.addHeadTab({
            path: path,
            title: item.domEvent.target.innerText,
            id: Date.now() // 主键
        })
    }
    // SubMenu 展开/关闭的触发行为
    function onOpenChange(e:string []) {
        setOpenKeys(e);
    }
    useEffect(() => {
        function resize(e:any) {
            if (e.target.innerWidth < 820) {
                setCollapsed(true)
            }
        }
        window.addEventListener("resize", resize);
        return () => {
            window.removeEventListener("resize", resize);
        }
    }, [])
    return (
        <div className={styleClass['aside-menu']} style={{width: collapsed ? '80px' : '256px'}}>
            <div className={styleClass['aside-header']}>
                {!collapsed ? <div className={styleClass['aside-logo']}>NIUYOU</div> : null}
                <Button type="text" onClick={() => {setCollapsed(!collapsed)}} icon={ collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />} size="large"></Button>
            </div>
            <Menu
                selectedKeys={[path]}
                openKeys={openKeys}
                mode="inline"
                theme={e.store.theme}
                inlineCollapsed={collapsed}
                className={styleClass['aside-menu-box']}
                onClick={itemClick} // 点击 MenuItem 调用此函数
                onOpenChange={onOpenChange}
            >
                <SubMenu key="sub1" icon={<MailOutlined />} title="报表中心">
                    <Menu.Item key="gameStatistic">游戏统计报表</Menu.Item>
                    <Menu.Item key="userStatistic">用户统计报表</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<AppstoreOutlined />} title="系统管理">
                    <Menu.Item key="account">系统账号管理</Menu.Item>
                    <Menu.Item key="role">角色权限管理</Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    )
}

export default connect(
    (state: Store) => {
        return {
            store: {
                theme: state.theme
            }
        }
    },
    dispatch => ({
        addHeadTab: (headTab:Array<HeadTab> | HeadTab) => dispatch(addHeadTab(headTab))
    })
)(AsideMenu)