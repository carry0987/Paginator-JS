---
id: dataRender
title: dataRender
---

`dataRender` is a function that is called after the data is fetched and processed. You can use this function to render the data in any way you want.

-   `optional`
-   Type: `(response: TCell[][]) => void`

```ts
new Paginator({
    // ...
    dataRender: (response) => {
        let dataHtml = '<ul>';
        response.forEach((item, index) => {
            dataHtml += '<li><a href="' + item[1] + '" target="_blank">' + item[0] + '</a></li>';
        });
        dataHtml += '</ul>';
        document.querySelector('.data-container').innerHTML = dataHtml;
    },
});
```
