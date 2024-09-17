---
id: import-function
title: Dynamic data import
keywords:
    - javascript
    - table
    - javascript table
    - paginatorjs
    - paginator js
    - import
    - import data
---

The `data` attribute accepts a function as well:

```ts paginator
const paginator = new Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
    data: () => [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
    ],
});
```
