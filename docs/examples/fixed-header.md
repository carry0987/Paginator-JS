---
id: fixed-header
title: Fixed Header
---

Simply add `height` and `fixedHeader` to your Paginator.js config object to enable fixed header feature:

```ts paginator
const paginator = new Paginator({
    columns: ['Name', 'Email', 'Title'],
    fixedHeader: true,
    data: Array(50)
        .fill()
        .map((x) => [
            faker.person.fullName(),
            faker.internet.email(),
            faker.person.jobTitle(),
        ]),
});
```
