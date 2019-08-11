export function debounce(fn, delay) {
    const context = this;
    let timer = null;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay);
    }
};