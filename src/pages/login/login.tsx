import React, {FC} from 'react'
import { Button, Input } from 'antd';
import styleClass from './login.module.less'
import { UserOutlined, KeyOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const Login:React.FC = () => {

    const navigate = useNavigate();

    function loginSubmit() {
        navigate('/home')
    }

    return (
        <>
            <header className={styleClass['login-header']}>
                <div className={styleClass['login-header-logo']}>NIUYOU</div>
            </header>
            <div className={styleClass['login-page']}>
                
                <form className={styleClass['login-box']}>
                    <div className={styleClass['box-title']}>
                        用户登录
                    </div>
                    <Input className={styleClass['input-item']} placeholder="输入账号" prefix={<UserOutlined />} />
                    <Input className={styleClass['input-item']} placeholder="输入密码" prefix={<KeyOutlined />} />
                    <Button type='primary' className={styleClass['button-item']} onClick={() => {loginSubmit()}}>登录</Button>
                    <p className={styleClass['login-msg']}>牛油与您一起加牛哟~</p>
                </form>
            </div>
        </>
    )
}

export default Login