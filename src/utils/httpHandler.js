const EXPIRED_CODE = [401, 403];
const httpHandler = async (status, data) => {
    if (status === 200) {
        const { status:code } = data;
        if (EXPIRED_CODE.includes(code)) {
            throw new Error('EXPIRED');
        }
        return data;
    } else if (EXPIRED_CODE.includes(status)) {
        throw new Error('EXPIRED');
    } else {
        throw data;
    }
};

export { httpHandler };