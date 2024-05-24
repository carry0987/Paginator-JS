export type DataSource<T = object> = string | T | Array<T> | ((data: T) => Array<T>);
