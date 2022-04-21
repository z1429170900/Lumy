import React from 'react'
import { Link } from 'react-router-dom'
import styleClass from './layout.module.less'
import AsideMenu from './asideMenu/asideMenu'
import {Input, Menu, Dropdown, Avatar, Badge} from 'antd'
import {
    SearchOutlined,
    BulbOutlined,
    CarryOutOutlined,
    CaretDownOutlined
} from '@ant-design/icons';
import ModeControl from './modeControl/modeControl'
import NavigationTab from './navigationTab/navigationTab'

const menu = (
    <Menu>
      <Menu.Item key={1}>
        <Link to='/home'>
          个人中心
        </Link>
      </Menu.Item>
      <Menu.Item key={2}>
        <Link to='/home'>
          我的消息
        </Link>
      </Menu.Item>
      <Menu.Item key={3}>
        <Link to='/'>
          退出登录
        </Link>
      </Menu.Item>
    </Menu>
);

function Layout(props: { children: any }) {
    return (
        <div className={styleClass['default-layout']}>
            <AsideMenu></AsideMenu>
            <div className={styleClass['default-layout-main']}>
                <header className={styleClass['default-layout-header']}>
                    <div className={styleClass['hd-left']}>
                        <Input placeholder="搜索" prefix={<SearchOutlined />} />
                    </div>
                    <div className={styleClass['hd-right']}>
                        <div className={styleClass['m-item']}>
                            <Badge count={999}>
                                <Avatar size={32} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} icon={<CarryOutOutlined />} />
                            </Badge>
                        </div>
                        <div className={styleClass['m-item']}>
                            <Badge count={999}>
                                <Avatar size={32} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }} icon={<BulbOutlined />} />
                            </Badge>
                        </div>
                        <div className={`${styleClass['m-item']} ${styleClass['m-item-av']}`}>
                            <Dropdown overlay={menu} placement="bottom">
                                <div className={styleClass['avatar']}>
                                    <Avatar size="large" src="https://img2.baidu.com/it/u=1048725472,3888888713&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" />
                                    <span className={styleClass['username']}>无敌破坏王<CaretDownOutlined /></span>
                                </div>
                            </Dropdown>
                        </div>
                        
                    </div>
                </header>
                <div className={styleClass['default-layout-content']}>
                    <NavigationTab></NavigationTab>
                    <div className={styleClass['default-layout-children']}>{props.children}</div>
                    <ModeControl></ModeControl>
                </div>
            </div>
        </div>
    )
}

export default Layout