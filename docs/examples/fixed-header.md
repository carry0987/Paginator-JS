---
id: fixed-header
title: Fixed Header 
---

Simply add `height` and `fixedHeader` to your Paginator.js config object to enable fixed header feature:

```ts paginator
const paginator = new Paginator({
  columns: [
      'Name',
      'Email',
      'Title',
   ],
  sort: true,
  pagination: true,
  fixedHeader: true,
  height: '400px',
  data: Array(50).fill().map(x => [
    faker.name.findName(),
    faker.internet.email(),
    faker.name.title(),
  ])
});
```
