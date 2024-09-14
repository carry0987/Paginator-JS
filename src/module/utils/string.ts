export function camelCase(str?: string | null): string {
    if (!str) return '';

    const words = str.split(' ');

    // Do not convert strings that are already in camelCase format
    if (words.length === 1 && /([a-z][A-Z])+/g.test(str)) {
        return str;
    }

    return words.map(function (word, index) {
            // If it is the first word, lowercase all the chars
            if (index == 0) {
                return word.toLowerCase();
            }

            // If it is not the first word only upper case the first char and lowercase the rest
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join('');
}
