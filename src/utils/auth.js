import Cookies from 'js-cookie';

const TokenKey = 'access';

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

export function arraySum(array = []) {
    if (!Array.isArray(array)) return 0;
    return array.reduce((prev, next) => prev + next, 0);
}

export function convertToBinary(number) {
    let num = number;
    let binary = (num % 2).toString();
    for (; num > 1; ) {
        num = parseInt(num / 2);
        binary = (num % 2) + binary;
    }
    return binary;
}

/**
 * 1read 2create 4update 8delete
 */
export function authToArray(number) {
    const binary = convertToBinary(number);
    let array = [];
    let length = binary.length;
    for (let i = 0; i < length; i++) {
        if (Number(binary.slice(i, i + 1)) === 1) array.push(Math.pow(2, length - i - 1));
    }
    return array;
}
