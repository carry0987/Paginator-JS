---
title: Hello World
sidebar_label: Hello World
---

Now that we have installed the library, let's write a simple example.

## Browser

You **don't need any build tools** to use Paginator.js. Simply include the JavaScript and CSS files in your project and then
call the `Paginator` class to create a new instance:

```html title="index.html"
<!DOCTYPE html>
<html lang="en">
    <head>
        <link
            href="https://unpkg.com/@carry0987/paginator/dist/theme/paginator.min.css"
            rel="stylesheet"
        />
    </head>
    <body>
        <div id="wrapper"></div>

        <script src="https://unpkg.com/@carry0987/paginator/dist/paginator.min.js"></script>
        <script src="src/index.js"></script>
    </body>
</html>
```

:::tip
Paginator.js is available as `paginator` in the global scope (e.g. `window.paginator`)
:::

And then instantiate `paginator.Paginator` class in your `index.js` file:

```js title="src/index.js"
new paginatorjs.Paginator({
    columns: ['Name', 'Email', 'Phone Number'],
    data: [
        ['John', 'john@example.com', '(353) 01 222 3333'],
        ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
        ['Eoin', 'eoin@gmail.com', '0097 22 654 00033'],
        ['Sarah', 'sarahcdd@gmail.com', '+322 876 1233'],
        ['Afshin', 'afshin@mail.com', '(353) 22 87 8356'],
    ],
}).render(document.getElementById('wrapper'));
```

<a target="_blank" rel="noreferrer" href="https://codesandbox.io/s/paginator-hello-world-o65fb?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit paginator-hello-world" src="https://codesandbox.io/static/img/play-codesandbox.svg" />
</a>

## Node.js module

You can import `paginator` in your application using:

```js
import { Paginator } from 'paginator';
import '@carry0987/paginator/theme/paginator.min.css';
```

### React

Here is an example of using Paginator.js in a React app

```jsx
import { Paginator } from '@carry0987/paginator';
import '@carry0987/paginator/theme/paginator.min.css';

function helloWorld() {
    const wrapperRef = useRef(null);

    const paginator = new Paginator({
        columns: ['Name', 'Email', 'Phone Number'],
        data: [
            ['John', 'john@example.com', '(353) 01 222 3333'],
            ['Mark', 'mark@gmail.com', '(01) 22 888 4444'],
        ],
    });

    useEffect(() => {
        paginator.render(wrapperRef.current);
    });

    return <div ref={wrapperRef} />;
}
```
