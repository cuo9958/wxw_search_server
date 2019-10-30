import Home from '../pages/home/index';
import Login from '../pages/login/index';
import Err404 from '../pages/404/index';

export default [
    { name: 'home', path: '/', page: Home, exact: true },
    { name: 'login', path: '/login', page: Login, exact: true },
    { name: '404', path: '*', page: Err404, exact: true }
];
