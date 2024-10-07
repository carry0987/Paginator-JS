import React from 'react';
import { Paginator, pluginAPI, PluginPosition, html, h } from '@carry0987/paginator';
import { jaJP } from '@carry0987/paginator/l10n';
import helloWorldPlugin from '@carry0987/paginator/plugins/demo';
import { faker } from '@faker-js/faker';

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...React,
    Paginator,
    pluginAPI,
    PluginPosition,
    helloWorldPlugin,
    html,
    h,
    jaJP,
    faker
};

export default ReactLiveScope;
