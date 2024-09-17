---
id: css-style
title: CSS Style
---

You can easily customize your Paginator.js instance and add CSS styles to it:

```ts paginator
const paginator = new Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
    data: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
        ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
        ['Nisen', 'nis900@gmail.com', '313 333 1923'],
    ],
    style: {
        table: {
            border: '3px solid #ccc',
        },
        th: {
            'background-color': 'rgba(0, 0, 0, 0.1)',
            color: '#000',
            'border-bottom': '3px solid #ccc',
            'text-align': 'center',
        },
        td: {
            'text-align': 'center',
        },
    },
});
```
