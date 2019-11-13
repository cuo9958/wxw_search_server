import Home from '../pages/home/index';
import Login from '../pages/login/index';
import Products from '../pages/products/index';
import ProductsDetail from '../pages/products/detail';
import Users from '../pages/users/index';
import UsersDetail from '../pages/users/detail';
import Err404 from '../pages/404/index';

export default [
    {
        /**
         * 页面名,菜单命中
         */
        name: 'home',
        /**
         * 显示名称
         */
        title: '首页',
        /**
         * icon图标
         */
        icon: 'fa fa-dashboard',
        /**
         * url路径
         */
        path: '/',
        /**
         * 页面组件
         */
        page: Home,
        /**
         * 是否强制匹配
         */
        exact: true,
        /**
         * 是否隐藏外层视图
         */
        hideLayout: false,
        /**
         * 是否不在菜单展示
         */
        hide: false
    },
    //商品列表
    { name: 'Products', title: '商品列表', icon: 'fa fa-ship', path: '/products', page: Products, exact: true },
    //商品详情
    { name: 'Products', title: '商品详情', hide: true, path: '/products/detail', page: ProductsDetail, exact: true },
    //用户管理
    { name: 'users', title: '用户管理', icon: 'fa fa-user', path: '/users', page: Users, exact: true },
    { name: 'users', title: '用户详情',hide: true, path: '/users/detail', page: UsersDetail, exact: true },

    { name: 'login', title: '登录', icon: 'fa fa-bars', hideLayout: true, hide: true, path: '/login', page: Login, exact: true },
    { name: '404', path: '*', page: Err404, exact: true, hide: true }
];
