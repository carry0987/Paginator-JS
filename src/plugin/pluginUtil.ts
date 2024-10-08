import Header from '@/component/header';
import { classJoin, className } from '@/module/utils/className';

class PluginUtil {
    // Header
    public leafColumns = Header.leafColumns;

    // Style
    public classJoin = classJoin;
    public className = className;
}

export const pluginUtil = new PluginUtil();
