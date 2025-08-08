# Paginator for React

React component for [@carry0987/paginator](https://carry0987.github.io/Paginator-JS/)

## Install

```bash
pnpm i -S @carry0987/paginator-react
```

Also, make sure you have `@carry0987/paginator` installed already as it's a peer dependency of `@carry0987/paginator-react`:

```bash
pnpm i -S @carry0987/paginator
```

## Usage

Import the Paginator component first:

```js
import { Paginator } from "@carry0987/paginator-react";
```

```tsx
<Paginator
    data={[
        ['John', 'john@example.com'],
        ['Mike', 'mike@gmail.com']
    ]}
    columns={['Name', 'Email']}
/>
```

Then you can pass all **Paginator** configs to the `Paginator` component. See [Paginator Config](https://carry0987.github.io/Paginator-JS/docs/config/) for more details.

## License

MIT
