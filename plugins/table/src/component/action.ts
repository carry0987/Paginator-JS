import { Ref } from 'preact';

export const SetTableRef = (tableRef: Ref<HTMLTableElement>) => (state: any) => {
    return {
        ...state,
        tableRef: tableRef
    };
};
