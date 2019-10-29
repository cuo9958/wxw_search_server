import React from 'react';
import { withRouter, Switch } from 'react-router-dom';

import Layout from '../pages/layout/index';
import Routes from './routes';

const Main = withRouter((props: any) => <Layout {...props} />);

export default class extends React.Component {

    render() {
        return (
            <Main>
                <Switch>
                    <Routes />
                </Switch>
            </Main>
        );
    }
}
