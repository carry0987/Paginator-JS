---
id: server
title: Import server-side data
keywords:
 - javascript
 - table
 - javascript table
 - paginatorjs
 - paginator js
 - server side
 - server side data
---

You can use the `server` property to load data from a remote server and populate the table:

```ts paginator
const paginator = new Paginator({
  columns: ['Name', 'Language', 'Released At', 'Artist'],
  server: {
    url: 'https://api.scryfall.com/cards/search?q=Inspiring',
    then: data => data.data.map(card => [card.name, card.lang, card.released_at, card.artist])
  } 
});
```

:::note
You can also use the `data` attribute, pass an async function and your favorite Ajax/XHR client to send
the request and feed the table, see [Async data import](./import-async.md).
:::
