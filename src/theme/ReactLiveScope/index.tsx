import React from 'react';
import { Paginator, html, h } from '@carry0987/paginator';
import { jaJP } from '@carry0987/paginator/l10n';
import { faker } from '@faker-js/faker';

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...React,
    Paginator,
    html,
    h,
    jaJP,
    faker
};

export default ReactLiveScope;
