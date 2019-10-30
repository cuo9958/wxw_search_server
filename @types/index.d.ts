/**
 * 路由的参数
 */
interface iLocation {
    pathname: string;
    search: string;
    hash: string;
}
/**
 * react-dom的路由props
 */
interface iReactRoute {
    location: iLocation;
}
