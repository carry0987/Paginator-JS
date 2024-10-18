import { PluginRenderer } from './pluginRenderer';
import { Status } from '@/type/status';
import Header from '@/component/header';
import { debounce } from '@/module/utils/debounce';
import { throttle } from '@/module/utils/throttle';
import { classJoin, className } from '@/module/utils/className';

class PluginUtil {
    // Status
    public Status = Status;

    // Header
    public leafColumns = Header.leafColumns;
    public tabularFormat = Header.tabularFormat;

    // Plugin
    public PluginRenderer = PluginRenderer;

    // Debounce
    public debounce = debounce;

    // Throttle
    public throttle = throttle;

    // Style
    public classJoin = classJoin;
    public className = (...args: string[]) => className('plugin', ...args);
}

export const pluginUtil = new PluginUtil();
