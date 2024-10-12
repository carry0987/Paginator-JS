---
id: columns
title: columns
---

To define the columns of the table

-   `optional` (you can render a table without the header)
-   Type: `string[]` or `TColumn[]`

```ts
new Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
});
```

or

```ts
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

| Name                  | Description                          | Type                         | Example                                                              |
| --------------------- | ------------------------------------ | ---------------------------- | -------------------------------------------------------------------- |
| id `optional`         | Column ID                            | `string`                     | `phoneNumber`                                                        |
| data `optional`       | Cell default data                    | `function` or TCell          | `(row) => row.name.firstName` or `myData`                            |
| name                  | Column name                          | `string`                     | `Name`                                                               |
| hidden `optional`     | To show/hide the column              | `boolean`                    | `true` or `0`                                                        |
| formatter `optional`  | (For plugin) Custom cell formatting  | `function`                   | `(cell: TCell, row: Row<TCell>, column: TColumn) => ComponentChild;` |

</div>

:::info
See [Cell formatting](../examples/cell-formatting.md) example for more details.
:::
