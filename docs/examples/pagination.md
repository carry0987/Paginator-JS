---
id: pagination
title: Pagination
keywords:
    - javascript
    - table
    - javascript table
    - paginatorjs
    - paginator js
    - page
    - table page
    - pagination
---

Pagination can be enabled by setting `pagination: true`:

```ts paginator
const paginator = new Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
    pagination: true,
    data: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
    ],
});
```

You can also change the default settings of the pagination plugin:

```ts paginator
const paginator = new Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
    pagination: {
        limit: 1,
    },
    data: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
    ],
});
```
