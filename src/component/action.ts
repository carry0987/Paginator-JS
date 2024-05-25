import { Status } from '../type/types';

export const SetStatusToRendered = () => (state: any[]) => {
    if (state.status === Status.Loaded) {
        return {
            ...state,
            status: Status.Rendered,
        };
    }

    return state;
};

export const SetLoadingData = () => (state: any[]) => {
    return {
        ...state,
        status: Status.Loading,
    };
};

export const SetDataErrored = () => (state: any[]) => {
    return {
        ...state,
        data: null,
        status: Status.Error,
    };
};

export const SetTableRef = (tableRef: any[]) => (state: any[]) => {
    return {
        ...state,
        tableRef: tableRef,
    };
};
