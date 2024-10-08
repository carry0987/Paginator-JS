---
title: Plugin basics
sidebar_label: Plugin basics
---

Paginator.js is a modular JavaScript framework which allows you to add custom plugins to it or remove the existing ones.
In this article, we talk about what is a Paginator.js plugin and how to develop one.

## Introduction

Paginator.js uses [Preact](https://preactjs.com/) under the hood to render the table and other components like search, pagination, etc.
A Paginator.js plugin is a [Preact Functional Component](https://preactjs.com/guide/v10/components/#functional-components) that render a Virtual Node. This interface is very similar to a React component.

Once you have a component that can render an element, then you can add it to the list of Paginator.js plugin and Paginator.js will
take care of rendering your plugin.

A [Plugin](https://github.com/carry0987/Paginator-JS/blob/master/src/interface/plugin.ts) has following properties:

```ts
interface Plugin<T extends FunctionComponent> {
    id: string;
    position: PluginPosition;
    component: T;
    order?: number;
}
```

Where `id` is a unique string, `position` defines where that plugin should be rendered and there is an optional `order`
property to change the ordering of plugins in a specific plugin position (e.g. header).

## Plugin Position

Paginator.js can render a plugin in different positions. Simply import the `PluginPosition` enum from the `@carry0987/paginator` package and use it when you call the `plugin.add(...)` function:

```ts
import { PluginPosition } from '@carry0987/paginator';
```

:::tip
If you need to render your plugin in a position that doesn’t already exist, please open a GitHub issue, and we will add a new PluginPosition!
:::

## Adding a Plugin

To add a plugin to a Paginator.js instance is as simple as calling `paginator.plugin.add(...)`. For example:

```ts
const paginator = new Paginator({
    pluginContainer: document.getElementById('plugin-container'), // Ensure plugin container is set
});

paginator.plugin.add({
    id: 'myPlugin',
    component: MyPlugin,
    position: PluginPosition.Header,
});
```

Note that `position` and `id` are mandatory fields, and `component` is the actual plugin function that we want to render. You can render the same plugin multiple times by calling the `plugin.add()` function and passing a unique ID each time.

## Setting the Plugin Container

Before using any plugins, you must set up the `pluginContainer`. This setup allows the plugin to render in the specified position according to the `PluginPosition`:

```html
<div id="paginator-container"></div>
<div id="plugin-container"></div> <!-- The plugin rendering area -->
```

## Adding a Plugin Using React Wrapper

Utilize the `plugins` property to add all the plugins you want:

```tsx
<Paginator
    ...
    plugins={[{
        id: 'myplugin',
        component: MyPlugin,
        position: PluginPosition.Header,
        order: 1
    }]}
/>
```

## Ordering of Plugins

You can pass an optional `order` property to `plugin.add()` to define the order of your components:

```ts
paginator.plugin.add({
    id: 'myFirstPlugin',
    component: MyPlugin,
    position: PluginPosition.Header,
    order: 1,
});

paginator.plugin.add({
    id: 'mySecondPlugin',
    component: MyPlugin,
    position: PluginPosition.Body,
    order: 2,
});
```

In the above example, `myFirstPlugin` renders first, followed by `mySecondPlugin`.

Now, let's take a look at writing a simple plugin.
