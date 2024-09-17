import React from 'react';
import {
    Paginator,
    html,
    h
} from '@carry0987/paginator';
import { jaJP } from '@carry0987/paginator/l10n';
import { faker } from '@faker-js/faker';

const ButtonExample = (props: any) => (
    <button
        {...props}
        style={{
            backgroundColor: 'white',
            color: 'black',
            border: 'solid red',
            borderRadius: 20,
            padding: 10,
            cursor: 'pointer',
            ...props.style,
        }}
    />
);

// Add react-live imports you need here
const ReactLiveScope = {
    React,
    ...React,
    ButtonExample,
    Paginator,
    html,
    h,
    jaJP,
    faker
};

export default ReactLiveScope;
