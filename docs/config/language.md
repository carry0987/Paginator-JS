---
id: language
title: language
---

To localize and update the messages used in Paginator.js.

-   `optional`
-   Type: `{ [key: string]: string | (...args) => string }`
-   Example: [Locales](../localization/locales.md)

```ts
new Paginator({
    // ...
    language: {
        pagination: {
            previous: 'Previous',
            next: 'Next',
            ellipsis: '...',
            page: (page: number) => `Page ${page}`,
        },
        loading: 'Loading...',
        noRecordsFound: 'No matching records found',
        error: 'An error happened while fetching the data',
    },
});
```

<br/>

:::tip
See [en_US](https://github.com/carry0987/Paginator-JS/blob/master/src/module/i18n/en_US.ts) for a full list of messages.
:::
