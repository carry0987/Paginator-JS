---
title: Advanced Plugin
sidebar_label: Advanced Plugin
---

With a basic understanding of how to write a Paginator.js plugin, let's explore some more advanced examples.

## Using the Pipeline

Paginator.js has an internal pipeline that processes, filters, and refines raw data. You can access the current pipeline using `config.pipeline` (via the `useConfig` hook) or utilize the `useSelector` hook to subscribe to a specific part of the Paginator.js state.

In this example, we have a table of Name (string) and Salary (double), and our custom plugin is responsible for summing salaries and displaying the total in the footer.

```tsx
import { pluginAPI } from '@carry0987/paginator';

function TotalSalaryPlugin() {
    const [total, setTotal] = pluginAPI.useState(0);
    const data = pluginAPI.useSelector((state) => state.tabular);

    pluginAPI.useEffect(() => {
        if (!data) return;

        setTotal(data.toArray().reduce((sum, row) => sum + row[1], 0));
    }, [data]);

    return (<b>Total: ${total.toLocaleString()}</b>);
}

const paginator = new Paginator({
    pluginContainer: document.getElementById('plugin-container'),
    columns: ['Name', 'Salary'],
    data: [
        ['John', Math.round(Math.random() * 100000)],
        ['Mark', Math.round(Math.random() * 100000)],
        ['Josh', Math.round(Math.random() * 100000)],
        ['Sara', Math.round(Math.random() * 100000)],
        ['Maria', Math.round(Math.random() * 100000)],
    ]
});

paginator.plugin.add({
    id: 'salaryplugin',
    component: TotalSalaryPlugin,
    position: PluginPosition.Footer,
});
```

## Using the Translation

Similarly, you can access the Translator function using the `useTranslator` hook to localize strings in your Paginator.js plugin:

```ts
import { pluginAPI } from '@carry0987/paginator';
```

```ts paginator
function HelloPlugin() {
    const lang = pluginAPI.useTranslator();

    return h('h1', {}, lang('hello'));
}

const paginator = new Paginator({
    pluginContainer: document.getElementById('plugin-container'),
    columns: ['Name', 'Salary'],
    data: [
        ['John', Math.round(Math.random() * 100000)],
        ['Mark', Math.round(Math.random() * 100000)],
        ['Josh', Math.round(Math.random() * 100000)],
    ],
    language: {
        hello: 'bonjour!!'
    }
});

paginator.plugin.add({
    id: 'bonjour',
    component: HelloPlugin,
    position: PluginPosition.Header,
});
```

## Hooks

Paginator.js provides the following hooks for building and customizing your plugin's behavior:

- `useOption`: Retrieve the current Paginator.js option object
- `useSelector`: Subscribe to a specific part of the Paginator.js state (e.g., `useSelector(state => state.data)`)
- `useTranslator`: Get the Paginator.js Translator function
- `useStore`: Retrieve the Paginator.js internal Store object
- `useConfig`: Retrieve the current Paginator.js config object

Also, the Preact hooks like `useState`, `useEffect`, and `useRef` and others are available for use in your Paginator.js plugins via `pluginAPI`.
Here is the list of hooks available in `pluginAPI`:

- `useEffect`
- `useCallback`
- `useState`
- `useRef`
- `useMemo`
- `useReducer`

:::warning
Actually, `useConfig` is for advanced use only, and you should use `useOption` instead
:::

These hooks enable you to create highly customizable and powerful plugins for Paginator.js, allowing for extensive functionality within your applications.
