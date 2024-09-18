---
id: className
title: className
---

To add CSS classname to a Paginator.js instance

-   `optional`
-   Type: `object`
-   Example: [CSS ClassName](../examples/css-classname.md) and [CSS-in-JS](../examples/css-in-js.md)

`className` type has the following properties:

<div className="full-width">

| Name                  | Description                                 | Type   |
| --------------------- | ------------------------------------------- | ------ |
| container `optional`  | className of the main container             | string |
| pageList `optional`   | className of the pagination container       | string |
| active `optional`     | className of the pagination current button  | string |
| pageButton `optional` | className of pagination buttons             | string |
| nextButton `optional` | className of the pagination next button     | string |
| prevButton `optional` | className of the pagination previous button | string |
| disable `optional`    | className of the pagination disabled button | string |

</div>

```ts
new Paginator({
    data: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
    ],
    className: {
        container: '',
        active: 'active',
        disable: 'disabled',
        pageList: 'pages',
        pageButton: 'page-item',
        prevButton: 'page-prev',
        nextButton: 'page-next'
    }
});
```
