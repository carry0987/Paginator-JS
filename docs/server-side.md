---
title: Server-side setup
sidebar_label: Server-side setup
---

Paginator.js supports server-side storage by default which basically takes care of sending HTTP calls to a server backend, pulling and
parsing the results and feeding the pipeline with the received data.

In addition to that, components like search, sort and pagination
can be connected to a server-side backend. Simply add `server` option to the existing plugin configurations to enable server-side functionality.

Lets setup a Paginator.js instance that pulls from a server-side API.

## `server` config

First of all, make sure you have defined the generic `server` config in your Paginator.js instance:

```js {3-8}
const paginator = new Paginator({
    columns: ['Title', 'Director', 'Producer'],
    server: {
        url: 'https://swapi.dev/api/films/',
        processData: (data) =>
            data.results.map((movie) => [
                movie.title,
                movie.director,
                movie.producer,
            ]),
    },
});
```

Here we are basically telling the instance that:

-   Our data source is a `ServerStorage` (instead of in-memory storage).
-   The base URL is `https://swapi.dev/api/films/`
-   Once we have received the data, let's feed the table with `movie.title`, `movie.director` and `movie.producer` which is
    our table columns (`processData` function)

The HTTP method is implicitly set to `GET` but we can change it to `POST` using the `method` property:

```js {4}
const paginator = new Paginator({
    server: {
        param: {
            method: 'POST'
        },
        // ...
    },
});
```

At this point, we have a fully functional server-side table, lets take a look!

```ts paginator
const paginator = new Paginator({
    columns: ['Title', 'Director', 'Producer'],
    pageSize: 1,
    server: {
        url: 'https://swapi.dev/api/films/',
        param: {
            method: 'GET'
        },
        processData: (data) => {
            return data.results.map((movie) => [
                movie.title,
                movie.director,
                movie.producer,
            ]);
        }
    },
});
```

<br/>

:::note
Check out the "Server-side" section of the examples for more details.
:::
