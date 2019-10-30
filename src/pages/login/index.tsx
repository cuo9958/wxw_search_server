import React from 'react';
import './index.less';
import { Input, Button } from 'element-react';

export default class extends React.Component<any, iReactRoute> {
    render() {
        return (
            <div id="login">
                <div className="login_container">
                    <div className="logo">
                        AST<span>管理系统v1.0</span>
                    </div>
                    <div className="form">
                        <div className="item">
                            <Input prepend={<i className="fa fa-user"></i>} placeholder="请输入用户名" />
                        </div>
                        <div className="item">
                            <Input prepend={<i className="fa fa-key"></i>} placeholder="请输入密码" />
                        </div>
                        <div className="item">
                            <Button type="primary" onClick={this.login}>
                                登 录<i className="fa fa-sign-in"></i>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    login = () => {
        this.props.history.push('/');
    };
}
