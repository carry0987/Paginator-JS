---
id: import-json
title: JSON
keywords:
    - javascript
    - table
    - javascript table
    - paginatorjs
    - paginator js
    - import json
---

In order to import JSON (or an array of objects), simply change the data input to `[{ key: value }, ... ]`.
Paginator.js expects each column to have a unique `id` field which matches the keys in the `data` object:

```ts paginator
const paginator = new Paginator({
    columns: [
        {
            id: 'name',
            name: 'Name',
        },
        {
            id: 'email',
            name: 'Email',
        },
        {
            id: 'phoneNumber',
            name: 'Phone Number',
        },
    ],
    data: [
        {
            name: 'John',
            email: 'john@example.com',
            phoneNumber: '(353) 01 222 3333',
        },
        {
            name: 'Mark',
            email: 'mark@gmail.com',
            phoneNumber: '(01) 22 888 4444',
        },
    ],
    dataRender: (response) => {
        let dataHtml = '<ul>';
        response.forEach((item, index) => {
            dataHtml += '<li><span>' + item.join(' : ') + '</span></li>';
        });
        dataHtml += '</ul>';
        document.querySelectorAll('div.list-container')[0].innerHTML = dataHtml;
    }
});
```

:::tip
Paginator.js tries to guess the `id` of columns by camelCasing them if column ID is not defined.

E.g. `Phone Number` becomes `phoneNumber`
:::

```ts paginator
const paginator = new Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
    data: [
        {
            name: 'John',
            email: 'john@example.com',
            phoneNumber: '(353) 01 222 3333',
        },
        {
            name: 'Mark',
            email: 'mark@gmail.com',
            phoneNumber: '(01) 22 888 4444',
        },
    ],
    dataRender: (response) => {
        let dataHtml = '<ul>';
        response.forEach((item, index) => {
            dataHtml += '<li><span>' + item.join(' : ') + '</span></li>';
        });
        dataHtml += '</ul>';
        document.querySelectorAll('div.list-container')[1].innerHTML = dataHtml;
    }
});
```

You can also leave the `columns` config empty if you want Paginator.js to set the column names automatically:

```ts paginator
const paginator = new Paginator({
    data: [
        {
            name: 'John',
            email: 'john@example.com',
            phoneNumber: '(353) 01 222 3333',
        },
        {
            name: 'Mark',
            email: 'mark@gmail.com',
            phoneNumber: '(01) 22 888 4444',
        },
    ],
    dataRender: (response) => {
        let dataHtml = '<ul>';
        response.forEach((item, index) => {
            dataHtml += '<li><span>' + item.join(' : ') + '</span></li>';
        });
        dataHtml += '</ul>';
        document.querySelectorAll('div.list-container')[2].innerHTML = dataHtml;
    }
});
```

`id` field accepts a function as well. If you have a complex JSON object, pass a function to `id` and try to refine and format your data:

```ts paginator
const paginator = new Paginator({
    columns: [
        {
            data: (row) => row.name.first,
            name: 'First Name',
        },
        {
            data: (row) => row.name.last,
            name: 'Last Name',
        },
        {
            id: 'email',
            name: 'Email',
        },
        {
            id: 'phoneNumber',
            name: 'Phone Number',
        },
    ],
    data: [
        {
            name: {
                first: 'John',
                last: 'Murphy',
            },
            email: 'john@example.com',
            phoneNumber: '(353) 01 222 3333',
        },
        {
            name: {
                first: 'Mark',
                last: 'Wiens',
            },
            email: 'mark@gmail.com',
            phoneNumber: '(01) 22 888 4444',
        },
    ],
    dataRender: (response) => {
        let dataHtml = '<ul>';
        response.forEach((item, index) => {
            dataHtml += '<li><span>' + item.join(' : ') + '</span></li>';
        });
        dataHtml += '</ul>';
        document.querySelectorAll('div.list-container')[3].innerHTML = dataHtml;
    }
});
```
