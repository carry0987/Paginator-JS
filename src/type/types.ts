export type DataSource<T = object> = string | T | Array<T> | ((data: T) => Array<T>);
export type EventArgs<T> = [T] extends [(...args: infer U) => any] ? U : [T] extends [void] ? [] : [T];
