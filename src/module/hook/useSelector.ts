import { useStore } from './useStore';
import { State } from '@/interface/state';
import { useEffect } from 'preact/hooks';
import { useSignal } from '@preact/signals'; 

export function useSelector<T>(selector: (state: State) => T): T {
    const store = useStore();
    const current = useSignal(selector(store.getState()));

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const updated = selector(store.getState());

            if (current.value !== updated) {
                current.value = updated;
            }
        });

        return unsubscribe;
    }, []);

    return current.value;
}
