---
title: Usage
sidebar_label: Usage
---

:::tip
Install the `paginatorjs-list` plugin if you haven't already. 
Follow the [installation manual](./index.md).
:::

## Example

In order to install the List plugin, set pluginContainer and instantiate the plugin:

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
            component: List
        }
    ]
});
```

## listPlugin

The `listPlugin` is a plugin object, instead of a `FunctionComponent`. It can let you add **`List`** plugin directly to the `Paginator` instance.

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
    plugins: [listPlugin]
});
```

`listPlugin` has the following properties:
```ts
{
    id: 'listPlugin',
    position: PluginPosition.Body,
    component: List,
    order: 1
}
```

:::tip
Follow the [Advanced Plugin](../advanced-plugin.md) article to learn more about writing Paginator.js plugins!
:::
