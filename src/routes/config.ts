import Home from '../pages/home/index';
import Login from '../pages/login/index';
import Err404 from '../pages/404/index';

export default [
    { name: 'home', title: '首页', icon: 'el-icon-message', path: '/', page: Home, exact: true },
    { name: 'login', title: '登录', icon: 'el-icon-message', path: '/login', page: Login, exact: true },
    { name: '404', path: '*', page: Err404, exact: true, hide: true }
];
