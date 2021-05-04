import { Button, Input } from 'antd';
import React, { PureComponent, Fragment } from 'react';
import './index.css';

export default class Login extends PureComponent {
    render() {
        return (
            <div className="LoginBox">
                {/* <Input size="large" placeholder="请输入邮箱地址" prefix={<UserOutlined />} />
                <Input.Password size="large" placeholder="请输入密码" prefix={<LockOutlined />} />
                <Button type="primary" block>
                    登录
                </Button> */}
                <div className="inputLogin">
                    <input type="text" placeholder="请输入邮箱地址" />
                </div>
                <div className="inputPwd">
                    <input type="password" placeholder="请输入密码" />
                </div>

                <div className="LoginBtn">登录</div>
            </div>
        );
    }
}
