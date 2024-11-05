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
export declare enum AuthorizeScope {
    UserLocation = "scope.userLocation",
    UserFuzzyLocation = "scope.userFuzzyLocation",
    UserLocationBackground = "scope.userLocationBackground",
    Record = "scope.record",
    Camera = "scope.camera",
    Bluetooth = "scope.bluetooth",
    WritePhotosAlbum = "scope.writePhotosAlbum",
    AddPhoneContact = "scope.addPhoneContact",
    AddPhoneCalendar = "scope.addPhoneCalendar",
    Werun = "scope.werun",
    Aaddress = "scope.address",
    InvoiceTitle = "scope.invoiceTitle",
    Invoice = "scope.invoice",
    UserInfo = "scope.userInfo"
}
