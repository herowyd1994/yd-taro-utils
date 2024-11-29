/** @format */

import * as Taro from '@tarojs/taro';
import {
    BoundingClientRectCallback,
    RequestPaymentOption,
    ShowModalOption,
    AuthorizeScope,
    Loading
} from './types';
import { transformUrlParams, sleep } from '@yd/utils';

/**
 * 路由跳转
 * @param {string} url
 * @param {Record<string, any>} params
 * @returns {Promise<void> | Promise<TaroGeneral.CallbackResult>}
 */
export const push = (url: string, params: Record<string, any> = {}) =>
    getPageNum() >= 10 ?
        toast('已跳转10个页面，无法继跳转')
    :   Taro.navigateTo({ url: `${url}${transformUrlParams(params)}` });
export const replace = (url: string, params: Record<string, any> = {}) =>
    Taro.redirectTo({ url: `${url}${transformUrlParams(params)}` });
export const reLaunch = (url: string, params: Record<string, any> = {}) =>
    Taro.reLaunch({ url: `${url}${transformUrlParams(params)}` });
export const switchTab = (url: string, params: Record<string, any> = {}) =>
    Taro.switchTab({ url: `${url}${transformUrlParams(params)}` });
/**
 * 路由返回
 * @param {number} delta
 * @param {number} delay
 * @returns {Promise<void>}
 */
export const back = async (delta: number = 1, delay: number = 0) => {
    await sleep(delay);
    const num = getPageNum();
    await Taro.navigateBack({ delta: delta > num ? num : delta });
};
/**
 * 获取页面数量
 * @returns {any}
 */
export const getPageNum = () => {
    const { length } = Taro.getCurrentPages();
    return length;
};
/**
 * 提示框
 * @param {string} title
 * @param {number} duration
 * @returns {Promise<void>}
 */
export const toast = async (title: string, duration: number = 1500) => {
    await Taro.showToast({ title, icon: 'none', duration });
    await sleep(duration);
};
/**
 * 加载中
 * @param {string} title
 * @param {number} delay
 * @param {number} timeout
 * @param {() => void} onTimeout
 * @returns {() => Promise<void>}
 */
export const loading = ({
    title = '加载中...',
    delay = 0,
    timeout = 15000,
    onTimeout = () => toast('已超时...')
}: Partial<Loading> = {}) => {
    Taro.showLoading({ title, mask: true });
    const timer = setTimeout(async () => {
        await hide();
        onTimeout();
    }, timeout);
    const hide = async () => {
        clearTimeout(timer);
        await sleep(delay);
        Taro.hideLoading();
    };
    return hide;
};
/**
 * 警告框
 * @param {string | string[]} content
 * @param {string} title
 * @param {ShowModalOption} option
 * @returns {Promise<never>}
 */
export const alert = async (
    content: string | string[],
    title: string = '',
    option?: ShowModalOption
) => {
    content = typeof content === 'string' ? [content] : content;
    const { confirm } = await Taro.showModal({
        title,
        content: (content as string[]).join('\r\n'),
        showCancel: false,
        confirmColor: '#4096FF',
        ...option
    });
    if (!confirm) {
        return Promise.reject('showModal Error');
    }
};
export const confirm = (content: string | string[], title: string = '', option?: ShowModalOption) =>
    alert(content, title, { showCancel: true, cancelColor: '#666666', ...option });
/**
 * 获取本地缓存
 * @param {string} key
 * @returns {Promise<any>}
 */
export const getStorage = async (key: string) => {
    const { data } = await Taro.getStorage({ key }).catch(() => ({ data: JSON.stringify(null) }));
    return JSON.parse(data);
};
/**
 * 设置本地缓存
 * @param {string} key
 * @param params
 * @returns {Promise<TaroGeneral.CallbackResult>}
 */
export const setStorage = (key: string, params: any) =>
    Taro.setStorage({ key, data: JSON.stringify(params) });
/**
 * 删除本地缓存
 * @param {string | string[] | "*"} keys
 * @returns {Promise<Awaited<TaroGeneral.CallbackResult>[]>}
 */
export const removeStorage = async (keys: string | string[] | '*' = '*') => {
    if (keys === '*') {
        const res = (await Taro.getStorageInfo()) as any;
        keys = res.keys;
    }
    keys = (typeof keys === 'string' ? [keys] : keys) as string[];
    return Promise.all(keys.map(key => Taro.removeStorage({ key })));
};
/**
 * 获取元素信息
 * @param {string} selector
 * @returns {Promise<BoundingClientRectCallback[]>}
 */
export const getBoundingClientRect = (selector: string) =>
    new Promise<BoundingClientRectCallback[]>(resolve => {
        Taro.createSelectorQuery()
            .selectAll(selector)
            .boundingClientRect()
            .exec(([res]) => resolve(res));
    });
/**
 * 获取图片信息
 * @param {string} src
 * @returns {Promise<getImageInfo.SuccessCallbackResult>}
 */
export const getImageInfo = (src: string) => Taro.getImageInfo({ src });
/**
 * 设置剪贴板内容
 * @param {string} data
 * @returns {Promise<void>}
 */
export const setClipboardData = async (data: string) => {
    await Taro.setClipboardData({ data });
    await toast('复制成功');
};
/**
 * 拍摄或从相册中选择图片、视频
 * @param {number} count
 * @param {"video" | "image" | "*"} mediaType
 * @param {"album" | "camera" | "*"} sourceType
 * @param {"back" | "front"} camera
 * @returns {Promise<ChooseMedia[]>}
 */
export const chooseMedia = async (
    count: number = 1,
    mediaType: 'video' | 'image' | '*' = '*',
    sourceType: 'album' | 'camera' | '*' = '*',
    camera: 'back' | 'front' = 'back'
) => {
    const { tempFiles } = await Taro.chooseMedia({
        count,
        mediaType: mediaType === '*' ? ['video', 'image'] : [mediaType],
        camera,
        maxDuration: 60,
        sourceType: sourceType === '*' ? ['album', 'camera'] : [sourceType]
    });
    return tempFiles;
};
/**
 * 会话选择文件
 * @param {number} count
 * @param {'video' | 'image' | 'file' | 'all'} type
 * @returns {Promise<ChooseFile[]>}
 */
export const chooseMessageFile = async (
    count: number = 1,
    type: 'video' | 'image' | 'file' | 'all' = 'all'
) => {
    const { tempFiles } = await Taro.chooseMessageFile({ count, type });
    return tempFiles;
};
/**
 * 预览图片
 * @param {string[]} urls
 * @param {number} i
 * @returns {Promise<TaroGeneral.CallbackResult>}
 */
export const previewImage = (urls: string[], i: number = 0) =>
    Taro.previewImage({ urls, current: urls[i] });
/**
 * 获取系统信息
 * @returns {getSystemInfoSync.Result}
 */
export const getSystemInfo = () => Taro.getSystemInfoSync();
/**
 * 获取登录凭证
 * @returns {Promise<string>}
 */
export const login = async () => {
    const { code } = await Taro.login();
    return code;
};
/**
 * 微信支付
 * @param {RequestPaymentOption} option
 * @returns {TaroGeneral.CallbackResult}
 */
export const requestPayment = (option: RequestPaymentOption) => Taro.requestPayment(option);
/**
 * 拨打电话
 * @param {string} phoneNumber
 * @returns {Promise<TaroGeneral.CallbackResult>}
 */
export const makePhoneCall = (phoneNumber: string) =>
    !/^(?:(?:\+|00)86)?1\d{10}$/.test(phoneNumber) ?
        toast('拨打的电话格式不正确')
    :   Taro.makePhoneCall({ phoneNumber });
/**
 * 保存图片到相册
 * @param {string} filePath
 * @returns {Promise<void>}
 */
export const saveImageToPhotosAlbum = async (filePath: string) => {
    await authorize(
        AuthorizeScope.WritePhotosAlbum,
        '您点击了拒绝授权将无法保存相册,点击确定重新获取授权'
    );
    await Taro.saveImageToPhotosAlbum({ filePath });
    await toast('保存成功');
};
/**
 * 向用户发起授权请求
 * @param {AuthorizeScope} scope
 * @param {string} message
 * @returns {Promise<TaroGeneral.CallbackResult>}
 */
export const authorize = async (scope: AuthorizeScope, message: string) => {
    const { authSetting } = await Taro.getSetting();
    if (!authSetting[scope]) {
        try {
            await Taro.authorize({ scope });
        } catch {
            await confirm(message);
            const { authSetting } = await Taro.openSetting();
            if (!authSetting[scope]) {
                return Promise.reject('authorize Error');
            }
        }
    }
};
