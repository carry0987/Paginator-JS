---
id: columns
title: columns
---

To define the columns of the table

-   `optional` (you can render a table without the header)
-   Type: `string[]` or `TColumn[]`

```js
new Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
});
```

or

```js
new Paginator({
    columns: [
        {
            name: 'Name',
        },
        {
            name: 'Email',
        },
        {
            name: 'Phone Number',
        },
    ],
});
```

`TColumn` type has the following properties:

<div className="full-width">

| Name                  | Description             | Type                         | Example                                                              |
| --------------------- | ----------------------- | ---------------------------- | -------------------------------------------------------------------- |
| id `optional`         | column ID               | `string`                     | `phoneNumber`                                                        |
| data `optional`       | Cell default data       | `function` or TCell          | `(row) => row.name.firstName` or `myData`                            |
| name                  | column name             | `string`                     | `Name`                                                               |
| hidden `optional`     | to show/hide the column | `boolean`                    | `true` or `0`                                                        |
| formatter `optional`  | custom cell formatting  | function                     | `(cell: TCell, row: Row<TCell>, column: TColumn) => ComponentChild;` |

</div>

:::info
See [Cell formatting](../examples/cell-formatting.md) example for more details.
:::
