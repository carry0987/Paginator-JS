import { useStore } from './useStore';
import { State } from '@/interface/state';
import { useEffect, useState } from 'preact/hooks';

export function useSelector<T>(selector: (state: State) => T): T {
    const store = useStore();
    const [current, setCurrent] = useState(selector(store.getState()));

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const updated = selector(store.getState());

            if (current !== updated) {
                setCurrent(updated);
            }
        });

        return unsubscribe;
    }, []);

    return current;
}
