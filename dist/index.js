"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.saveImageToPhotosAlbum = exports.makePhoneCall = exports.requestPayment = exports.login = exports.getSystemInfo = exports.previewImage = exports.chooseMessageFile = exports.chooseMedia = exports.setClipboardData = exports.getImageInfo = exports.getBoundingClientRect = exports.removeStorage = exports.setStorage = exports.getStorage = exports.confirm = exports.alert = exports.loading = exports.toast = exports.getPageNum = exports.back = exports.switchTab = exports.reLaunch = exports.replace = exports.push = void 0;
var Taro = require("@tarojs/taro");
var types_1 = require("./types");
var utils_1 = require("@yd/utils");
var push = function (url, params) {
    if (params === void 0) { params = {}; }
    return (0, exports.getPageNum)() >= 10 ?
        (0, exports.toast)('已跳转10个页面，无法继跳转')
        : Taro.navigateTo({ url: "".concat(url).concat((0, utils_1.transformUrlParams)(params)) });
};
exports.push = push;
var replace = function (url, params) {
    if (params === void 0) { params = {}; }
    return Taro.redirectTo({ url: "".concat(url).concat((0, utils_1.transformUrlParams)(params)) });
};
exports.replace = replace;
var reLaunch = function (url, params) {
    if (params === void 0) { params = {}; }
    return Taro.reLaunch({ url: "".concat(url).concat((0, utils_1.transformUrlParams)(params)) });
};
exports.reLaunch = reLaunch;
var switchTab = function (url, params) {
    if (params === void 0) { params = {}; }
    return Taro.switchTab({ url: "".concat(url).concat((0, utils_1.transformUrlParams)(params)) });
};
exports.switchTab = switchTab;
var back = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (delta, delay) {
        var num;
        if (delta === void 0) { delta = 1; }
        if (delay === void 0) { delay = 0; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, (0, utils_1.sleep)(delay)];
                case 1:
                    _a.sent();
                    num = (0, exports.getPageNum)();
                    return [4, Taro.navigateBack({ delta: delta > num ? num : delta })];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    });
};
exports.back = back;
var getPageNum = function () {
    var length = Taro.getCurrentPages().length;
    return length;
};
exports.getPageNum = getPageNum;
var toast = function (title_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([title_1], args_1, true), void 0, function (title, duration) {
        if (duration === void 0) { duration = 1500; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Taro.showToast({ title: title, icon: 'none', duration: duration })];
                case 1:
                    _a.sent();
                    return [4, (0, utils_1.sleep)(duration)];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    });
};
exports.toast = toast;
var loading = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.title, title = _c === void 0 ? '加载中...' : _c, _d = _b.delay, delay = _d === void 0 ? 0 : _d, _e = _b.timeout, timeout = _e === void 0 ? 15000 : _e, _f = _b.onTimeout, onTimeout = _f === void 0 ? function () { return (0, exports.toast)('已超时...'); } : _f;
    Taro.showLoading({ title: title, mask: true });
    var timer = setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, hide()];
                case 1:
                    _a.sent();
                    onTimeout();
                    return [2];
            }
        });
    }); }, timeout);
    var hide = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clearTimeout(timer);
                    return [4, (0, utils_1.sleep)(delay)];
                case 1:
                    _a.sent();
                    Taro.hideLoading();
                    return [2];
            }
        });
    }); };
    return hide;
};
exports.loading = loading;
var alert = function (content_1) {
    var args_1 = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args_1[_i - 1] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([content_1], args_1, true), void 0, function (content, title, option) {
        var confirm;
        if (title === void 0) { title = ''; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = typeof content === 'string' ? [content] : content;
                    return [4, Taro.showModal(__assign({ title: title, content: content.join('\r\n'), showCancel: false, confirmColor: '#4096FF' }, option))];
                case 1:
                    confirm = (_a.sent()).confirm;
                    if (!confirm) {
                        return [2, Promise.reject('showModal Error')];
                    }
                    return [2];
            }
        });
    });
};
exports.alert = alert;
var confirm = function (content, title, option) {
    if (title === void 0) { title = ''; }
    return (0, exports.alert)(content, title, __assign({ showCancel: true, cancelColor: '#666666' }, option));
};
exports.confirm = confirm;
var getStorage = function (key) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, Taro.getStorage({ key: key }).catch(function () { return ({ data: JSON.stringify(null) }); })];
            case 1:
                data = (_a.sent()).data;
                return [2, JSON.parse(data)];
        }
    });
}); };
exports.getStorage = getStorage;
var setStorage = function (key, params) {
    return Taro.setStorage({ key: key, data: JSON.stringify(params) });
};
exports.setStorage = setStorage;
var removeStorage = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (keys) {
        var res;
        if (keys === void 0) { keys = '*'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(keys === '*')) return [3, 2];
                    return [4, Taro.getStorageInfo()];
                case 1:
                    res = (_a.sent());
                    keys = res.keys;
                    _a.label = 2;
                case 2:
                    keys = (typeof keys === 'string' ? [keys] : keys);
                    return [2, Promise.all(keys.map(function (key) { return Taro.removeStorage({ key: key }); }))];
            }
        });
    });
};
exports.removeStorage = removeStorage;
var getBoundingClientRect = function (selector) {
    return new Promise(function (resolve) {
        Taro.createSelectorQuery()
            .selectAll(selector)
            .boundingClientRect()
            .exec(function (_a) {
            var res = _a[0];
            return resolve(res);
        });
    });
};
exports.getBoundingClientRect = getBoundingClientRect;
var getImageInfo = function (src) { return Taro.getImageInfo({ src: src }); };
exports.getImageInfo = getImageInfo;
var setClipboardData = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, Taro.setClipboardData({ data: data })];
            case 1:
                _a.sent();
                return [4, (0, exports.toast)('复制成功')];
            case 2:
                _a.sent();
                return [2];
        }
    });
}); };
exports.setClipboardData = setClipboardData;
var chooseMedia = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (count, mediaType, sourceType, camera) {
        var tempFiles;
        if (count === void 0) { count = 1; }
        if (mediaType === void 0) { mediaType = '*'; }
        if (sourceType === void 0) { sourceType = '*'; }
        if (camera === void 0) { camera = 'back'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Taro.chooseMedia({
                        count: count,
                        mediaType: mediaType === '*' ? ['video', 'image'] : [mediaType],
                        camera: camera,
                        maxDuration: 60,
                        sourceType: sourceType === '*' ? ['album', 'camera'] : [sourceType]
                    })];
                case 1:
                    tempFiles = (_a.sent()).tempFiles;
                    return [2, tempFiles];
            }
        });
    });
};
exports.chooseMedia = chooseMedia;
var chooseMessageFile = function () {
    var args_1 = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args_1[_i] = arguments[_i];
    }
    return __awaiter(void 0, __spreadArray([], args_1, true), void 0, function (count, type) {
        var tempFiles;
        if (count === void 0) { count = 1; }
        if (type === void 0) { type = 'all'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, Taro.chooseMessageFile({ count: count, type: type })];
                case 1:
                    tempFiles = (_a.sent()).tempFiles;
                    return [2, tempFiles];
            }
        });
    });
};
exports.chooseMessageFile = chooseMessageFile;
var previewImage = function (urls, i) {
    if (i === void 0) { i = 0; }
    return Taro.previewImage({ urls: urls, current: urls[i] });
};
exports.previewImage = previewImage;
var getSystemInfo = function () { return Taro.getSystemInfoSync(); };
exports.getSystemInfo = getSystemInfo;
var login = function () { return __awaiter(void 0, void 0, void 0, function () {
    var code;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, Taro.login()];
            case 1:
                code = (_a.sent()).code;
                return [2, code];
        }
    });
}); };
exports.login = login;
var requestPayment = function (option) { return Taro.requestPayment(option); };
exports.requestPayment = requestPayment;
var makePhoneCall = function (phoneNumber) {
    return !/^(?:(?:\+|00)86)?1\d{10}$/.test(phoneNumber) ?
        (0, exports.toast)('拨打的电话格式不正确')
        : Taro.makePhoneCall({ phoneNumber: phoneNumber });
};
exports.makePhoneCall = makePhoneCall;
var saveImageToPhotosAlbum = function (filePath) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, exports.authorize)(types_1.AuthorizeScope.WritePhotosAlbum, '您点击了拒绝授权将无法保存相册,点击确定重新获取授权')];
            case 1:
                _a.sent();
                return [4, Taro.saveImageToPhotosAlbum({ filePath: filePath })];
            case 2:
                _a.sent();
                return [4, (0, exports.toast)('保存成功')];
            case 3:
                _a.sent();
                return [2];
        }
    });
}); };
exports.saveImageToPhotosAlbum = saveImageToPhotosAlbum;
var authorize = function (scope, message) { return __awaiter(void 0, void 0, void 0, function () {
    var authSetting, _a, authSetting_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4, Taro.getSetting()];
            case 1:
                authSetting = (_b.sent()).authSetting;
                if (!!authSetting[scope]) return [3, 7];
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 7]);
                return [4, Taro.authorize({ scope: scope })];
            case 3:
                _b.sent();
                return [3, 7];
            case 4:
                _a = _b.sent();
                return [4, (0, exports.confirm)(message)];
            case 5:
                _b.sent();
                return [4, Taro.openSetting()];
            case 6:
                authSetting_1 = (_b.sent()).authSetting;
                if (!authSetting_1[scope]) {
                    return [2, Promise.reject('authorize Error')];
                }
                return [3, 7];
            case 7: return [2];
        }
    });
}); };
exports.authorize = authorize;
