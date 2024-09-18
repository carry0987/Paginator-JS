---
id: server
title: server
---

To load and import data from a remote URL. Server storage uses `fetch` API to send the call and fetch the data.

-   `optional` (`data` or `server` must be provided)
-   Example: [Server](../examples/server.md) and [Server-side pagination](../examples/server-side-pagination.md)

<div className="full-width">

| Name                     | Description                          | Type        | Example                                                       |
| ------------------------ | ------------------------------------ | ----------- | ------------------------------------------------------------- |
| url                      | Server base URL                      | string      | `http://myapi.com`                                            |
| param.method `optional`  | HTTP method                          | string      | `GET`, `POST`, etc                                            |
| param.headers `optional` | HTTP headers                         | HeadersInit | `{ 'Accept-Charset': 'utf-8', 'X-My-Custom-Header': 'cool' }` |
| pageUrl `optional`       | URL to fetch the next page           | string      | `http://myapi.com?page=2`                                     |
| pageBody `optional`      | HTTP Body payload                    | BodyInit    | `{ 'loginId': '@carry0987/paginator', 'password': 'd4da' }`   |
| processData `optional`   | Function to refine/select attributes | Function    | `(data) => [data.name, data.email]`                           |
| handle `optional`        | Function to handle the response      | Function    | `(res) => res.json()`                                         |
| total `optional`         | Function to set the total records    | Function    | `(data) => data.total`                                        |

</div>

```js
new Paginator({
    columns: ['Name', 'Language', 'Released At', 'Artist'],
    server: {
        url: 'https://api.scryfall.com/cards/search?q=Inspiring',
        processData: (data) =>
            data.data.map((card) => [
                card.name,
                card.lang,
                card.released_at,
                card.artist,
            ]),
        handle: (res) => {
            // no matching records found
            if (res.status === 404) return { data: [] };
            if (res.ok) return res.json();

            throw Error('oh no :(');
        },
    },
});
```
