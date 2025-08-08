import React from 'react';
import { useRef, useEffect } from 'react';
import { Paginator as Paginatorjs, Options } from '@carry0987/paginator';

const Paginator: React.FC<Partial<Options>> = (props) => {
    const wrapper = useRef<HTMLDivElement>(null);
    const instance = useRef<Paginatorjs | null>(null);

    useEffect(() => {
        if (!instance.current) {
            instance.current = new Paginatorjs(props || {});
        }

        if (wrapper.current) {
            wrapper.current.innerHTML = '';
            instance.current.render(wrapper.current);
        }
    }, []);

    useEffect(() => {
        instance.current?.updateConfig(props).forceRender();
    }, [props]);

    return <div ref={wrapper} />;
};

export { Paginator };
