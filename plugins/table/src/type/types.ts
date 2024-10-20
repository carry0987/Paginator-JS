import { pluginUtil } from '@carry0987/paginator';

export type CSSDeclaration = {
    [key: string]: string | number;
};

export type TRow = InstanceType<typeof pluginUtil.Row>;
export type TCell = InstanceType<typeof pluginUtil.Cell>;
