import Header from './header';
import { Status } from '@/type/status';
import { State } from '@/interface/state';

export const SetStatusToRendered = () => (state: State) => {
    if (state.status === Status.Loaded) {
        return {
            ...state,
            status: Status.Rendered
        };
    }

    return state;
};

export const SetLoadingData = () => (state: State) => {
    return {
        ...state,
        status: Status.Loading
    };
};

export const SetData = (data?: State['tabular']) => (state: State) => {
    if (!data) return state;

    return {
        ...state,
        tabular: data,
        status: Status.Loaded
    };
};

export const SetDataErrored = () => (state: State) => {
    return {
        ...state,
        tabular: null,
        status: Status.Error
    };
};

export const SetHeader = (header?: Header) => (state: State) => {
    return {
        ...state,
        header: header || null
    };
};
