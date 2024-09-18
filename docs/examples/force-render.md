---
id: force-render
title: forceRender
---

Using `updateConfig()` and `forceRender()` functions, you can update the config of an existing instance and re-render the
container.

In this example, we render a Paginator.js instance, and then we attempt to update the config object and re-render it after 2 seconds:

```tsx live
function () {
    const wrapper = useRef(null);

    useEffect(() => {
        // initial setup
        const paginator = new Paginator({
            columns: ['Name', 'Email', 'Phone Number'],
            data: [
                ['John', 'john@example.com', '(353) 01 222 3333'],
            ],
            dataRender: (data) => {
                return data.map((row) => {
                    return row.map((cell) => {
                        return cell;
                    });
                });
            },
        }).render(wrapper.current);

        setTimeout(() => {
            // lets update the config
            paginator.updateConfig({
                data: [
                    ['John', 'john@example.com', '(353) 01 222 3333'],
                    ['Mark', 'mark@gmail.com',   '(01) 22 888 4444'],
                ]
            });
        }, 2000);
    }, []);

    return (<div ref={wrapper} />);
}
```
