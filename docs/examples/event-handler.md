---
id: event-handler
title: Events
---

Paginator.js has a global EventEmitter object which is used to emit events throughout the application lifecycle.
Simply, use the `on` method to capture and bind a function to events.

Open your **developer tools console** to see the logs:

```ts paginator
const paginator = new Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
    data: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
        ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
        ['Nisen', 'nis900@gmail.com', '313 333 1923'],
    ],
});

paginator.on('rowClick', (...args) =>
    console.log('row: ' + JSON.stringify(args), args)
);
paginator.on('cellClick', (...args) =>
    console.log('cell: ' + JSON.stringify(args), args)
);
```

:::tip
See a full list of Paginator.js global events on [event.ts](https://github.com/carry0987/Paginator-JS/blob/master/src/interface/events.ts).
:::
