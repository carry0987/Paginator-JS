---
id: css-in-js
title: CSS-in-JS
---

import { css } from '@emotion/css';

You can use any CSS-in-JS frameworks with Paginator.js. In this example, we are using [Emotion](https://emotion.sh/) to style
our Paginator.js instance.

:::note
“CSS-in-JS” refers to a pattern where CSS is composed using JavaScript instead of defined in external files.
:::

Import your favorite CSS-in-JS tool first:

```js
import { css } from '@emotion/css';
```

And then use the `className` config to connect them together:

```ts paginator
const paginator = new Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
    data: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
        ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
        ['Nisen', 'nis900@gmail.com', '313 333 1923'],
    ],
    className: {
        container: {
            font-family: 'Tahoma';
        },
    },
});
```

:::info
See [className](../config/className.md) config for more details.
:::