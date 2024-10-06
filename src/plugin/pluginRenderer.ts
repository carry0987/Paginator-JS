import { PluginPosition } from '@/plugin/pluginPosition';
import { useConfig } from '@/module/hook/useConfig';
import { h, Fragment } from 'preact';

export function PluginRenderer(props: {
    props?: any;
    // To render a single plugin
    pluginId?: string;
    // To render all plugins in this PluginPosition
    position?: PluginPosition;
}) {
    const config = useConfig();

    if (props.pluginId) {
        // Render a single plugin
        const plugin = config.plugin.get(props.pluginId);

        if (!plugin) return null;

        return h(
            Fragment,
            {},
            h(plugin.component, {
                plugin: plugin,
                ...props.props
            })
        );
    } else if (props.position !== undefined) {
        // Render using a specific plugin position
        return h(
            Fragment,
            {},
            config.plugin.list(props.position).map((p) => {
                return h(p.component, { plugin: p, ...props.props });
            })
        );
    }

    return null;
}
