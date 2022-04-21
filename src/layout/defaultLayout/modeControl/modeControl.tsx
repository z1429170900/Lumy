import React from 'react'
import { Dropdown, Menu } from 'antd'
import {
    BgColorsOutlined
} from '@ant-design/icons'
import styleClass from './modeControl.module.less'
import { connect } from 'react-redux'
import { setTheme } from '@/store/themeAction'

const menu = (doSetTheme: Function) => {
    return (
        <Menu>
          <Menu.Item key={1} onClick={() => {doSetTheme('light')}}>
            <div>标准模式</div>
          </Menu.Item>
          <Menu.Item key={2} onClick={() => {doSetTheme('dark')}}>
            <div>暗黑模式</div>
          </Menu.Item>
        </Menu>
    );
}

function ModeControl(e:{doSetTheme: Function}) {
    return (
        <Dropdown overlay={menu(e.doSetTheme)} placement="top">
            <div className={styleClass['mode-control']}>
                <BgColorsOutlined />
            </div>
        </Dropdown>
        
    )
}

export default connect(
    null,
    dispatch => ({
        doSetTheme: (theme:any) => dispatch(setTheme(theme))
    })
)(ModeControl)