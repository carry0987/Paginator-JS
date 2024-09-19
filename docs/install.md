---
title: Install
sidebar_label: Install
---

Paginator.js comes in multiple formats including **UMD** and **ES module**:

 - paginator.esm.js
 - paginator.min.js
 - i10n/

Explore the project output on [https://unpkg.com/browse/@carry0987/paginator/dist/](https://unpkg.com/browse/@carry0987/paginator/dist/).

:::tip
You can either install Paginator.js using NPM or directly include the JavaScript and CSS files from a CDN
:::

## Node.js

Paginator.js is available as [`@carry0987/paginator`](https://www.npmjs.com/package/@carry0987/paginator) on NPM. To install the package:

```bash
npm install @carry0987/paginator --save
```

Above command will install all the dependencies as well. Then include both JavaScript and CSS files:

```js
import { Paginator } from '@carry0987/paginator';
import '@carry0987/paginator/theme/paginator.min.css';
```

## Browser

Paginator.js is also available on following CDNs and can be used directly.

### unpkg

You can download Paginator.js from [unpkg.com/browse/@carry0987/paginator/dist](https://unpkg.com/browse/@carry0987/paginator/dist/).

Add both JavaScript and css files:

```html
<script type="module">
    import {
        Paginator,
        html
    } from "https://unpkg.com/@carry0987/paginator/dist/paginator.esm.js";
</script>
```

```html title="theme/paginator.min.css"
<link href="https://unpkg.com/@carry0987/paginator/dist/theme/paginator.min.css" rel="stylesheet" />
```

You can also import the UMD format:

```html title="paginator.min.js"
<script src="https://unpkg.com/@carry0987/paginator/dist/paginator.min.js"></script>
```

### jsdelivr

Paginator.js is available on [jsdelivr.com/package/npm/@carry0987/paginator](https://www.jsdelivr.com/package/npm/@carry0987/paginator).

```html title="paginator.min.js"
<script src="https://cdn.jsdelivr.net/npm/@carry0987/paginator/dist/paginator.min.js"></script>
```

```html title="theme/paginator.min.css"
<link href="https://cdn.jsdelivr.net/npm/@carry0987/paginator/dist/theme/paginator.min.css" rel="stylesheet" />
```
