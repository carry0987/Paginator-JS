import { PluginRenderer } from './pluginRenderer';
import { Status } from '@/type/status';
import { TColumn } from '@/interface/column';
import Base from '@/component/base';
import Header from '@/component/header';
import Cell from '@/component/cell';
import Row from '@/component/row';
import { debounce } from '@/module/utils/debounce';
import { throttle } from '@/module/utils/throttle';
import { classJoin, className } from '@/module/utils/className';

class PluginUtil {
    private constructor() {
        // Prevent instantiation of this static utility class
    }

    // Status
    public static Status = Status;

    // Base
    public static Base = Base;

    // Header
    public static leafColumns = Header.leafColumns;
    public static tabularFormat = Header.tabularFormat;

    // Cell
    public static Cell = Cell;

    // Row
    public static Row = Row;

    // Plugin
    public static PluginRenderer = PluginRenderer;

    // Debounce
    public static debounce = debounce;

    // Throttle
    public static throttle = throttle;

    // Style
    public static classJoin = classJoin;
    public static className = (...args: string[]) => className('plugin', ...args);
}

namespace PluginUtil {
    export type Column = TColumn;
}

export { PluginUtil };
