---
title: Locales
sidebar_label: Locales
keywords:
    - javascript
    - javascript pagination
    - paginator
    - i18n
    - l10n
    - localization
    - internationalization
    - language
    - lang
---

Paginator.js has support for various different languages:

-   en_US (default)
-   es_LA
-   ja_JP
-   th_TH
-   zh_TW

## Installing a Locale

Import your language file first:

```ts
import { jaJP } from '@carry0987/paginator/l10n';
```

:::note
All locales are combined into one file. There is a UMD format for web-browsers as well: e.g. `@carry0987/paginator/l10n/dist/l10n.min.js`:
https://unpkg.com/@carry0987/paginator/l10n/dist/l10n.min.js
:::

Then pass it to the `language` setting of your Paginator.js:

```ts paginator
const paginator = new Paginator({
    columns: ['Name', 'Email', 'Title'],
    pageSize: 5,
    data: Array(50).fill().map(x => [
        faker.person.fullName(),
        faker.internet.email(),
        faker.person.jobTitle(),
    ]),
    language: jaJP
});
```

Also, you can easily customize Paginator.js messages and add your language. Simply extend the `language` config to replace the strings:

```ts paginator
const paginator = new Paginator({
    columns: ['Name', 'Email', 'Title'],
    pageSize: 5,
    data: Array(50).fill().map(x => [
        faker.person.fullName(),
        faker.internet.email(),
        faker.person.jobTitle(),
    ]),
    language: {
        'pagination': {
            'previous': '⬅️',
            'next': '➡️'
        }
    }
});
```

<br/>

## Creating a Locale

Copy the [en_US](https://github.com/carry0987/Paginator-JS/blob/master/src/module/i18n/en_US.ts) file, update the values and send a PR!
