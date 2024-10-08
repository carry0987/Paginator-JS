import Header from '@/component/header';
import { classJoin, className } from '@/module/utils/className';

class PluginUtil {
    public classJoin = classJoin;
    public className = className;

    // Header
    public leafColumns = Header.leafColumns;
}

export const pluginUtil = new PluginUtil();
