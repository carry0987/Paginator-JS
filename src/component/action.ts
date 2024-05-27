import { Status } from '../type/types';
import { State } from '../interface/state';

export const SetStatusToRendered = () => (state: State) => {
    if (state.status === Status.Loaded) {
        return {
            ...state,
            status: Status.Rendered,
        };
    }

    return state;
};

export const SetData = (data: null) => (state: State) => {
    if (!data) return state;

    return {
        ...state,
        data: data,
        status: Status.Loaded,
    };
};

export const SetLoadingData = () => (state: State) => {
    return {
        ...state,
        status: Status.Loading,
    };
};

export const SetDataErrored = () => (state: State) => {
    return {
        ...state,
        data: null,
        status: Status.Error,
    };
};
