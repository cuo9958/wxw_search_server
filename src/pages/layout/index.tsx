import React from 'react';
import './index.less';
import Utils from '../../services/utils';
import { Menu } from 'element-react';
import url_configs from '../../routes/config';

function RenderMenus(props: any) {
    const item = props.item;
    if (item.hide) return null;
    return (
        <Menu.Item index={item.path}>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
        </Menu.Item>
    );
}

export default class extends React.Component<iReactRoute> {
    render() {
        return (
            <div>
                <div id="sider">
                    <div id="logo">后台系统 v1.0</div>
                    <div id="menus">
                        <Menu mode="vertical" onSelect={this.onSelect} defaultActive="/" theme="dark">
                            {url_configs.map(item => (
                                <RenderMenus key={item.name} item={item} />
                            ))}
                        </Menu>
                    </div>
                </div>
                <div id="main">{this.props.children}</div>
            </div>
        );
    }

    componentDidMount() {
        console.log(Utils.checkUrl(this.props.location.pathname));
    }
    componentWillUpdate() {
        console.log('adw');
    }

    onSelect = (index: string) => {
        console.log('select', index);
    };
}
