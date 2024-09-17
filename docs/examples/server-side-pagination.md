---
id: server-side-pagination
title: Server Side Pagination
keywords:
    - javascript
    - table
    - javascript table
    - paginatorjs
    - paginator js
    - pagination
    - server side pagination
---

Add `server` property to the `pagination` config to enable server-side pagination. Also, make sure the `total` property
is correctly defined in the main `server` config block:

```ts paginator
const paginator = new Paginator({
    columns: ['Pokemon', 'URL'],
    pageSize: 5,
    server: {
        param: {
            method: 'GET',
        },
        url: 'https://pokeapi.co/api/v2/pokemon',
        processData: (data) =>
            data.results.map((pokemon) => [
                pokemon.name,
                html(`<a href=${pokemon.url}>Link to ${pokemon.name}</a>`),
            ]),
        total: (data) => data.count,
        pageUrl: (prev, page, limit) =>
            `${prev}?limit=${limit}&offset=${page * limit}`,
    },
});
```

:::tip
You can also send POST HTTP calls if you add `method: 'POST'` to the main `server` config.
:::
