---
id: import-async
title: Async data import
keywords:
    - javascript
    - table
    - javascript table
    - paginatorjs
    - paginator js
    - async
    - async function
---

The `data` attribute accepts an `async` function, too. This is useful for making any external HTTP calls and loading
data from a server.

Here we have passed a function to the `data` attribute which returns a `Promise` object and resolves
the data after 1 second:

```ts paginator
const paginator = new Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
    data: () => {
        return new Promise((resolve) => {
            setTimeout(
                () =>
                    resolve([
                        ['John', 'john@example.com', '(353) 01 222 3333'],
                        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
                    ]),
                1000
            );
        });
    },
});
```
