import React from 'react';
import Playground from '@theme/Playground';
import ReactLiveScope from '@theme/ReactLiveScope';
import CodeBlock from '@theme-init/CodeBlock';

type Props = {
    readonly children: string;
    readonly className?: string;
    readonly metastring?: string;
};

interface PaginatorCodeBlockProps extends Props {
    paginator: string;
    [key: string]: string;
}

interface LiveCodeBlockProps extends Props {
    live: boolean;
}

function hasPaginatorMeta(
    props: PaginatorCodeBlockProps,
    type: string = 'paginator'
) {
    return props[type] || props.metastring?.split(' ').includes(type);
}

const withLiveEditor = (Component: typeof CodeBlock) => {
    function WrappedComponent(
        props: LiveCodeBlockProps & PaginatorCodeBlockProps
    ) {
        if (props.live) {
            return <Playground scope={ReactLiveScope} {...props} />;
        }

        if (hasPaginatorMeta(props)) {
            return (
                <Playground
                    scope={ReactLiveScope}
                    {...props}
                    transformCode={(code: string) => {
                        return `
                            function () {
                                ${code}

                                const wrapperRef = useRef(null);

                                useEffect(() => {
                                    if (typeof (paginator) == 'object' && wrapperRef && wrapperRef.current && wrapperRef.current.childNodes.length === 0) {
                                        paginator.render(wrapperRef.current);
                                    }
                                });

                                return (
                                    <div ref={wrapperRef} />
                                );
                            }
                            `;
                    }}
                />
            );
        }

        return <Component {...props} />;
    }

    return WrappedComponent;
};

export default withLiveEditor(CodeBlock);