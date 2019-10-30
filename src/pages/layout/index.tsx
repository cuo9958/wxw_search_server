import React from 'react';
import Utils from '../../services/utils';

export default class extends React.Component<iReactRoute> {
    render() {
        return this.props.children;
    }

    componentDidMount() {
        console.log(Utils.checkUrl(this.props.location.pathname));
    }
}
