/** @format */
import { toast } from './index';

export interface BoundingClientRectCallback {
    bottom: number;
    dataset: Record<string, any>;
    height: number;
    id: string;
    left: number;
    right: number;
    top: number;
    width: number;
}
export interface RequestPaymentOption {
    timeStamp: string;
    nonceStr: string;
    package: string;
    signType: 'MD5' | 'HMAC-SHA256' | 'RSA';
    paySign: string;
}
export interface ShowModalOption {
    cancelColor?: string;
    cancelText?: string;
    confirmColor?: string;
    confirmText?: string;
    content?: string;
    showCancel?: boolean;
    title?: string;
}
export interface Loading {
    title: string;
    delay: number;
    timeOut: number;
    onError(): void;
}
export enum AuthorizeScope {
    // 精确地理位置
    UserLocation = 'scope.userLocation',
    // 模糊地理位置
    UserFuzzyLocation = 'scope.userFuzzyLocation',
    // 后台定位
    UserLocationBackground = 'scope.userLocationBackground',
    // 麦克风
    Record = 'scope.record',
    // 摄像头
    Camera = 'scope.camera',
    // 蓝牙
    Bluetooth = 'scope.bluetooth',
    // 添加到相册
    WritePhotosAlbum = 'scope.writePhotosAlbum',
    // 添加到联系人
    AddPhoneContact = 'scope.addPhoneContact',
    // 添加到日历
    AddPhoneCalendar = 'scope.addPhoneCalendar',
    // 微信运动步数
    Werun = 'scope.werun',
    // 通讯地址
    Aaddress = 'scope.address',
    // 发票抬头
    InvoiceTitle = 'scope.invoiceTitle',
    // 获取发票
    Invoice = 'scope.invoice',
    // 用户信息
    UserInfo = 'scope.userInfo'
}
