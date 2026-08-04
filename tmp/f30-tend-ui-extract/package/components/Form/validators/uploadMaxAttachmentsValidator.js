const createUploadMaxAttachmentsValidator = (options) => {
    var _a;
    const max = (_a = options === null || options === void 0 ? void 0 : options.max) !== null && _a !== void 0 ? _a : Infinity;
    return (_, value) => {
        const isError = value.length > max;
        if (isError)
            Promise.reject();
        return Promise.resolve();
    };
};

export { createUploadMaxAttachmentsValidator };
