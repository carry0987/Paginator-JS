import Utils from '@/module/utils/utils-ext';
import { ID } from '@/type/types';

class Base {
    private readonly _id: ID;

    constructor(id?: ID) {
        this._id = id || Utils.generateUUID();
    }

    public get id(): ID {
        return this._id;
    }
}

export default Base;
