/** Decode HTML entities when Storybook stringifies render() output. */
export function decodeHtmlEntities(code) {
    if (!code.includes('&lt;') && !code.includes('&gt;') && !code.includes('&amp;')) {
        return code;
    }
    const el = document.createElement('textarea');
    el.innerHTML = code;
    return el.value;
}
export function resolveDocsSource(code, context) {
    var _a, _b, _c;
    const source = (_b = (_a = context.parameters) === null || _a === void 0 ? void 0 : _a.docs) === null || _b === void 0 ? void 0 : _b.source;
    if (source === null || source === void 0 ? void 0 : source.code) {
        return source.code;
    }
    if (typeof (source === null || source === void 0 ? void 0 : source.generate) === 'function') {
        return source.generate((_c = context.args) !== null && _c !== void 0 ? _c : {}, context);
    }
    return decodeHtmlEntities(code);
}
export function htmlSource(code) {
    return { source: { code: code.trim(), language: 'html' } };
}
