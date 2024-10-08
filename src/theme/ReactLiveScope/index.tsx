import React from 'react';
import { Paginator, pluginAPI, PluginPosition, html, h } from '@carry0987/paginator';
import { jaJP } from '@carry0987/paginator/l10n';
import { listPlugin, List } from '@carry0987/paginator/plugins/list';
import { tablePlugin, Table } from '@carry0987/paginator/plugins/table';
import { faker } from '@faker-js/faker';

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...React,
    Paginator,
    pluginAPI,
    PluginPosition,
    listPlugin,
    List,
    tablePlugin,
    Table,
    html,
    h,
    jaJP,
    faker
};

export default ReactLiveScope;
