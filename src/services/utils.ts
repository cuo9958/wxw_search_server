import PathRegexp from 'path-to-regexp';
import url_configs from '../routes/config';
import urlParse from 'url-parse';

export default {
    checkUrl(url: string) {
        const curr = url_configs.find(item => PathRegexp(item.path).test(url));
        if (!curr) return url_configs[0];
        return curr;
    },
    parseParams(url: string) {
        return urlParse(url, true);
    }
};
