---
id: beforeDataLoad
title: beforeDataLoad
---

`beforeDataLoad` is a callback function that will be called before data is loaded. This function can be used to show a loading message or spinner.

-   `optional`
-   Type: `() => void`

```ts
new Paginator({
    // ...
    beforeDataLoad: () => {
        document.querySelector('.data-container').innerHTML = 'Loading data ...';
    }
});
```
