import { PluginRenderer } from './pluginRenderer';
import { Status } from '@/type/status';
import Header from '@/component/header';
import { classJoin, className } from '@/module/utils/className';

class PluginUtil {
    // Status
    public Status = Status;

    // Header
    public leafColumns = Header.leafColumns;
    public tabularFormat = Header.tabularFormat;

    // Plugin
    public PluginRenderer = PluginRenderer;

    // Style
    public classJoin = classJoin;
    public className = (...args: string[]) => className('plugin', ...args);
}

export const pluginUtil = new PluginUtil();
