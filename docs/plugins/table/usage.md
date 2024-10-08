---
title: Usage
sidebar_label: Usage
---

:::tip
Install the `paginatorjs-table` plugin if you haven't already. 
Follow the [installation manual](./index.md).
:::

## Example

In order to install the Table plugin, set pluginContainer and instantiate the plugin:

```ts paginator
const paginator = new Paginator({
    columns: [
        { 
            name: 'Name',
            formatter: (cell) => `Name: ${cell}`
        },
        'Email',
    ],
    data: Array(50).fill().map(x => [
        faker.person.fullName(),
        faker.internet.email(),
    ]),
    pageSize: 5,
    pluginContainer: document.getElementById('plugin-container'),
    plugins: [
        {
            id: 'myList',
            position: PluginPosition.Body,
            component: Table
        }
    ]
});
```

## tablePlugin

The `tablePlugin` is a plugin object, instead of a `FunctionComponent`. It can let you add **`Table`** plugin directly to the `Paginator` instance.

```ts paginator tmp
const paginator = new Paginator({
    columns: [
        { 
            name: 'Name',
            formatter: (cell) => `Name: ${cell}`
        },
        'Email',
    ],
    data: Array(50).fill().map(x => [
        faker.person.fullName(),
        faker.internet.email(),
    ]),
    pageSize: 5,
    pluginContainer: document.getElementById('plugin-container-tmp'),
    plugins: [tablePlugin]
});
```

`tablePlugin` has the following properties:
```ts
{
    id: 'tablePlugin',
    position: PluginPosition.Body,
    component: Table,
    order: 1
}
```

:::tip
Follow the [Advanced Plugin](../advanced-plugin.md) article to learn more about writing Paginator.js plugins!
:::
