import React from 'react';
import configs from './config';
import { Route } from 'react-router-dom';

interface iProps {
    location: any;
}
export default class extends React.Component<any, iProps> {
    render() {
        console.log(this.props);
        return configs.map((item, index) => <Route key={index} exact={!!item.exact} path={item.path} component={item.page} />);
    }
}
