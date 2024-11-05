import * as Taro from '@tarojs/taro';
import { AuthorizeScope } from './types';
import { transformUrlParams, sleep } from '@yd/utils';
export const push = (url, params = {}) => getPageNum() >= 10 ?
    toast('已跳转10个页面，无法继跳转')
    : Taro.navigateTo({ url: `${url}${transformUrlParams(params)}` });
export const replace = (url, params = {}) => Taro.redirectTo({ url: `${url}${transformUrlParams(params)}` });
export const reLaunch = (url, params = {}) => Taro.reLaunch({ url: `${url}${transformUrlParams(params)}` });
export const switchTab = (url, params = {}) => Taro.switchTab({ url: `${url}${transformUrlParams(params)}` });
export const back = async (delta = 1, delay = 0) => {
    await sleep(delay);
    const num = getPageNum();
    return Taro.navigateBack({ delta: delta > num ? num : delta });
};
export const getPageNum = () => {
    const { length } = Taro.getCurrentPages();
    return length;
};
export const toast = (title, duration = 1500) => Taro.showToast({ title, icon: 'none', duration });
export const loading = ({ title = '加载中...', delay = 0, timeOut = 15000, onError = () => toast('已超时...') } = {}) => {
    Taro.showLoading({ title, mask: true });
    const timer = setTimeout(async () => {
        await hide();
        onError();
    }, timeOut);
    const clear = () => clearTimeout(timer);
    const hide = async () => {
        clear();
        await sleep(delay);
        Taro.hideLoading();
    };
    return {
        clear,
        hide
    };
};
export const alert = async (content, title = '', option) => {
    content = typeof content === 'string' ? [content] : content;
    const { confirm } = await Taro.showModal({
        title,
        content: content.join('\r\n'),
        showCancel: false,
        confirmColor: '#4096FF',
        ...option
    });
    if (!confirm) {
        return Promise.reject('showModal Error');
    }
};
export const confirm = (content, title = '', option) => alert(content, title, { showCancel: true, cancelColor: '#666666', ...option });
export const getStorage = async (key) => {
    const { data } = await Taro.getStorage({ key }).catch(() => ({ data: JSON.stringify(null) }));
    return JSON.parse(data);
};
export const setStorage = (key, params) => Taro.setStorage({ key, data: JSON.stringify(params) });
export const removeStorage = async (keys = '*') => {
    if (keys === '*') {
        const res = (await Taro.getStorageInfo());
        keys = res.keys;
    }
    keys = (typeof keys === 'string' ? [keys] : keys);
    return Promise.all(keys.map(key => Taro.removeStorage({ key })));
};
export const getBoundingClientRect = (selector) => new Promise(resolve => {
    Taro.createSelectorQuery()
        .selectAll(selector)
        .boundingClientRect()
        .exec(([res]) => resolve(res));
});
export const getImageInfo = (src) => Taro.getImageInfo({ src });
export const setClipboardData = async (data) => {
    await Taro.setClipboardData({ data });
    return toast('复制成功');
};
export const chooseMedia = async (count = 1, mediaType = '*', sourceType = '*', camera = 'back') => {
    const { tempFiles } = await Taro.chooseMedia({
        count,
        mediaType: mediaType === '*' ? ['video', 'image'] : [mediaType],
        camera,
        maxDuration: 60,
        sourceType: sourceType === '*' ? ['album', 'camera'] : [sourceType]
    });
    return tempFiles;
};
export const chooseMessageFile = async (count = 1, type = 'all') => {
    const { tempFiles } = await Taro.chooseMessageFile({ count, type });
    return tempFiles;
};
export const previewImage = (urls, i = 0) => Taro.previewImage({ urls, current: urls[i] });
export const getSystemInfo = () => Taro.getSystemInfoSync();
export const login = async () => {
    const { code } = await Taro.login();
    return code;
};
export const requestPayment = (option) => Taro.requestPayment(option);
export const makePhoneCall = (phoneNumber) => !/^(?:(?:\+|00)86)?1\d{10}$/.test(phoneNumber) ?
    toast('拨打的电话格式不正确')
    : Taro.makePhoneCall({ phoneNumber });
export const saveImageToPhotosAlbum = async (filePath) => {
    await authorize(AuthorizeScope.WritePhotosAlbum, '您点击了拒绝授权将无法保存相册,点击确定重新获取授权');
    await Taro.saveImageToPhotosAlbum({ filePath });
    return toast('保存成功');
};
export const authorize = async (scope, message) => {
    const { authSetting } = await Taro.getSetting();
    if (!authSetting[scope]) {
        try {
            await Taro.authorize({ scope });
        }
        catch {
            await confirm(message);
            const { authSetting } = await Taro.openSetting();
            if (!authSetting[scope]) {
                return Promise.reject('authorize Error');
            }
        }
    }
};
