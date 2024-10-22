---
id: hello-world
title: Hello, World!
keywords:
    - javascript
    - table
    - javascript table
    - paginatorjs
    - paginator js
---

:::tip
You can interact with the following editor!
:::

```ts paginator
const paginator = new Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
    data: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
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

Or you can update the config using `updateConfig`:

```ts paginator
const paginator = new Paginator({
    data: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
    ],
    dataRender: (response) => {
        let dataHtml = '<ul>';
        response.forEach((item, index) => {
            dataHtml += '<li><span>' + item.join(' : ') + '</span></li>';
        });
        dataHtml += '</ul>';
        document.querySelectorAll('div.list-container')[1].innerHTML = dataHtml;
    }
}).updateConfig({
    columns: ['Name', 'Email', 'Phone Number'],
});
```
