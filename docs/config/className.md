---
id: className
title: className 
---

To add CSS classname to a Paginator.js instance

 - `optional`
 - Type: `object`
 - Example: [CSS ClassName](../examples/css-classname.md) and [CSS-in-JS](../examples/css-in-js.md)

`className` type has the following properties:

<div className="full-width">

| Name                       | Description                       |  Type  |
|----------------------------|-----------------------------------|--------|
| container `optional`               | className of the main container   | string |
| pagination `optional`              | className of the pagination container | string |
| paginationButton `optional`        | className of pagination buttons | string |
| paginationButtonNext `optional`    | className of the pagination next button | string |
| paginationButtonCurrent `optional` | className of the pagination current button | string |
| paginationButtonPrev `optional`    | className of the pagination previous button | string |
| loading `optional`                 | className of the loading container | string |
| notfound `optional`                | className of the empty table container | string |
| error `optional`                   | className of the error container | string |

</div>

```js
new Paginator({
  data: [
    ['John', 'john@example.com', '(353) 01 222 3333'],
    ['Mark', 'mark@gmail.com',   '(01) 22 888 4444']
  ],
  className: {
    td: 'my-td-class',
    table: 'custom-table-class' 
  }
});
```
