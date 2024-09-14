export type MessageFormat = (...args: any[]) => string;
export type Message = string | MessageFormat;
export type Language = { [key: string]: Message | Language };
