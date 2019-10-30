import Home from '../pages/home/index';
import Login from '../pages/login/index';
import Products from '../pages/products/index';
import Err404 from '../pages/404/index';

export default [
    { name: 'home', title: '首页', icon: 'fa fa-dashboard', path: '/', page: Home, exact: true },
    { name: 'Products', title: '商品列表', icon: 'fa fa-ship', path: '/products', page: Products, exact: true },
    { name: 'login2', title: '登录', icon: 'fa fa-bars', path: '/login2', page: Login, exact: true },

    { name: 'login', title: '登录', icon: 'fa fa-bars', hideLayout: true, hide: true, path: '/login', page: Login, exact: true },
    { name: '404', path: '*', page: Err404, exact: true, hide: true }
];
