import React from 'react';
import './index.less';
import Utils from '../../services/utils';
import { Dropdown } from 'element-react';
import url_configs from '../../routes/config';

function Menus(item: any, onSelect: any, active: string) {
    if (item.hide) return;
    return (
        <li key={item.name} className={'menu_item' + (active === item.name ? ' active' : '')} onClick={() => onSelect(item.path)}>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
        </li>
    );
}

interface iState {
    active: string;
    layout: boolean;
}

export default class extends React.Component<iReactRoute, iState> {
    constructor(props: any) {
        super(props);
        const curr = Utils.checkUrl(props.location.pathname);
        this.state = {
            active: curr.name,
            layout: !curr.hideLayout
        };
    }
    render() {
        if (!this.state.layout) return this.props.children;
        return (
            <div>
                <div id="sider">
                    <div id="logo">后台系统 v1.0</div>
                    <div id="menus">
                        <ul className="menu_bg">{url_configs.map((item, index) => Menus(item, this.onSelect, this.state.active))}</ul>
                    </div>
                </div>
                <div id="main">
                    <div className="top_menus flex-right">
                        <Dropdown
                            trigger="click"
                            onCommand={this.onCommand}
                            menu={
                                <Dropdown.Menu>
                                    <Dropdown.Item command="/user_center">个人中心</Dropdown.Item>
                                    <Dropdown.Item command="/login" divided>
                                        注销
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            }
                        >
                            <span className="el-dropdown-link">
                                系统管理员<i className="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                        </Dropdown>
                    </div>
                    <div className="continer">{this.props.children}</div>
                </div>
            </div>
        );
    }

    componentWillReceiveProps(pp: any) {
        const curr = Utils.checkUrl(pp.location.pathname);
        this.setState({
            active: curr.name,
            layout: !curr.hideLayout
        });
    }
    onSelect = (index: string) => {
        this.props.history.push(index);
    };

    onCommand = (command: string) => {
        this.props.history.push(command);
    };
}
