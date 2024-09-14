import {
    getElem,
    hasParent,
    errorUtils,
    isEmpty,
    isObject,
    isArray,
    isString,
    isFunction,
    fetchData,
    encodeFormData,
    deepMerge,
    shallowMerge,
    generateUUID,
    Interfaces
} from '@carry0987/utils';

class Utils {
    static throwError = errorUtils.throwError;
    static getElem = getElem;
    static hasParent = hasParent;
    static deepMerge = deepMerge;
    static shallowMerge = shallowMerge;
    static generateUUID = generateUUID;
    static isEmpty = isEmpty;
    static isObject = isObject;
    static isArray = isArray;
    static isString = isString;
    static isFunction = isFunction;
    static fetchData = fetchData;
    static encodeFormData = encodeFormData;

    static isNumeric(value: any): boolean {
        return !isNaN(parseFloat(value)) && isFinite(value);
    }

    static composeClassNames(...classNames: Array<string>): string {
        classNames = classNames.filter((className) => !!className); // Remove empty class names

        return classNames.length > 0 ? classNames.join(' ') : '';
    }

    static isPageItem(element: HTMLElement): boolean {
        const checkList = ['J-pagination-page', 'J-pagination-previous', 'J-pagination-next'];
        const classList = element.classList;

        for (let i = 0; i < checkList.length; i++) {
            if (classList.contains(checkList[i])) {
                return true;
            }
        }

        return false;
    }
}

export { Utils as default, Interfaces };
