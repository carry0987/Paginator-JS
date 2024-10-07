---
title: Writing a Plugin
sidebar_label: Writing a Plugin
---

Paginator.js Plugins are Preact Functional Components. Simply create a new functional component to render a plugin:

```ts
import { h } from '@carry0987/paginator';
```

```ts
function MyPlugin() {
    return h('h1', {}, 'Hello World!');
}
```

:::tip
You don't have to use the `h` function to render elements if your bundler is set up to understand Preact JSX renderer:

```tsx
function MyPlugin() {
    return (<h1>Hello World!</h1>);
}
```

See this guide for more details https://preactjs.com/guide/v10/getting-started#setting-up-jsx
:::

```ts paginator
function MyPlugin() {
    return h('h1', {}, 'Hello World!');
}

const paginator = new Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
    data: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com',   '(01) 22 888 4444'],
    ],
    pluginContainer: document.getElementById('aaa'),
    plugins: [
        helloWorldPlugin
    ],
});

paginator.plugin.add({
    id: 'myplugins',
    component: MyPlugin,
    position: PluginPosition.Body,
});
```
