import { PluginUtil } from '@carry0987/paginator';

export type CSSDeclaration = {
    [key: string]: string | number;
};

export type TRow = InstanceType<typeof PluginUtil.Row>;
export type TCell = InstanceType<typeof PluginUtil.Cell>;
