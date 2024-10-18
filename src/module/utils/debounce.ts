/**
 * Creates a debounced function that delays the invocation of the provided function
 * until after the specified wait time has elapsed since the last time it was called.
 *
 * @param func - The original function to debounce.
 * @param waitFor - The number of milliseconds to delay the function call.
 *
 * @returns A debounced function that returns a Promise resolving to the result of the original function.
 */
export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let timeoutId: ReturnType<typeof setTimeout> | number;

    return (...args: Parameters<F>): Promise<ReturnType<F>> =>
        new Promise((resolve) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => resolve(func(...args)), waitFor);
        });
};
