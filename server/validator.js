function validate(array, onerror) {
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (isFunction(item.value)) {
            if (item.value.call()) {
                onerror(item.error);
                return true;
            }
        }
        else if (isEmpty(item.value)) {
            onerror(item.error);
            return true;
        }
    }
    return false;
}

function isEmpty(str) {
    return (!str || str.length === 0 || (str.trim && !str.trim()));
}

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

module.exports = {
    validate,
    isEmpty,
    isFunction
}