---
id: display
title: display
---

To configure the display options of the Paginator.js instance

-   `optional`
-   Type: `boolean`

`display` option has the following properties:

<div className="full-width">

| Name                               | Description                                                       | Type          |
| ---------------------------------- | ----------------------------------------------------------------- | ------------- |
| showPrevious `optional`            | Display the previous button                                       |    boolean    |
| showNext `optional`                | Display the next button                                           |    boolean    |
| showPageNumbers `optional`         | Display page number buttons                                       |    boolean    |
| hideFirstOnEllipsisShow `optional` | To hide the first page number button when ellipsis showed         |    boolean    |
| hideLastOnEllipsisShow `optional`  | To hide the last page number when ellipsis showed                 |    boolean    |
| autoHidePrevious `optional`        | To hide the previous button when current page number is the first |    boolean    |
| autoHideNext `optional`            | To hide the next button when current page number is the last      |    boolean    |

</div>

```ts
new Paginator({
    data: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
        ['Eoin', 'eo3n@yahoo.com', '(05) 10 878 5554'],
        ['Nisen', 'nis900@gmail.com', '313 333 1923'],
    ],
    display: {
        showPrevious: true,
        showNext: true,
        showPageNumbers: true,
        hideFirstOnEllipsisShow: false,
        hideLastOnEllipsisShow: false,
        autoHidePrevious: false,
        autoHideNext: false
    },
});
```
