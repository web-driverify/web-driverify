function string(str) {
    str = String(str);
    return {
        summary: function(len) {
            len = len || 64;
            let result = str.substr(0, len);
            if (str.length > len) {
                result += '... (' + (str.length - len) + ' more bytes)';
            }
            return result;
        }
    };
}

export default string;
