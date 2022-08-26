export const responseParser = (result) => {
    const { status, data} = result;
    const dataCode = data.code;
    if (status === 401 || status === 403 // 兼容旧版BOSS
        || dataCode === 401 || dataCode === 403) {// 新版BOSS token校验状态码
        let theCode = (status === 401 || status === 403) ? status : dataCode;
        return [{
            code: theCode,
            message: data?.message || '登录信息过期，请重新登录',
            data
        }, data];
    }
    if (status === 200) {
        return [null, data];
    }
    return [{message: data?.message || '访问失败，请稍后再试', data}, data];
};


const _errorHandler = {};
const register = (code, handler) => {
    _errorHandler[code] = handler;
};
const unregister = (code) => {
    delete _errorHandler[code];
};
const handle = (error) => {
    let errorCode = error.code || '';
    if (_errorHandler[errorCode]) {
        _errorHandler[errorCode](error);
    } else if (_errorHandler['default']) {
        _errorHandler['default'](error);
    }
};

export const errorHandler = {
    register,
    unregister,
    handle
};
