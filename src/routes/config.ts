import Home from '../pages/home/index';
import Login from '../pages/login/index';

export default [{ name: 'home', path: '/', page: Home, exact: true }, { name: 'login', path: '/login', page: Login, exact: true }];
