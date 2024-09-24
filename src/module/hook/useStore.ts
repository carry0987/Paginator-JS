import { useOption } from './useOption';

export function useStore() {
    const option = useOption();

    return option.state;
}
