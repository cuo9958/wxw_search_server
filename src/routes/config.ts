import Home from '../pages/home/index';
import Login from '../pages/login/index';
import Err404 from '../pages/404/index';

export default [
    { name: 'home', title: '首页', icon: 'fa fa-dashboard', path: '/', page: Home, exact: true },
    { name: 'login', title: '登录', icon: 'fa fa-bars', hideLayout: true, hide: true, path: '/login', page: Login, exact: true },
    { name: 'login1', title: '登录', icon: 'fa fa-bars', path: '/login1', page: Login, exact: true },
    { name: 'login2', title: '登录', icon: 'fa fa-bars', path: '/login2', page: Login, exact: true },
    { name: 'login3', title: '登录', icon: 'fa fa-bars', path: '/login3', page: Login, exact: true },
    { name: 'login4', title: '登录', icon: 'fa fa-bars', path: '/login4', page: Login, exact: true },
    { name: 'login5', title: '登录', icon: 'fa fa-bars', path: '/login5', page: Login, exact: true },
    { name: '404', path: '*', page: Err404, exact: true, hide: true }
];
