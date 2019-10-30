import PathRegexp from 'path-to-regexp';
import url_configs from '../routes/config';

export default {
    checkUrl(url: string) {
        return url_configs.find(item => PathRegexp(item.path).test(url));
    }
};
