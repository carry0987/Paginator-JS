import React from 'react';
import { Paginator, pluginAPI, PluginPosition, html, h } from '@carry0987/paginator';
import { jaJP } from '@carry0987/paginator/l10n';
import listPlugin from '@carry0987/paginator/plugins/list';
import { faker } from '@faker-js/faker';

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...React,
    Paginator,
    pluginAPI,
    PluginPosition,
    listPlugin,
    html,
    h,
    jaJP,
    faker
};

export default ReactLiveScope;
