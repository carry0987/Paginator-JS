import { StorageResponse } from '@/interface/response';

/**
 * Base Storage class. All storage implementation must inherit this class
 */
abstract class Storage<I> {
    /**
     * Returns all rows based on ...args
     * 
     * @param args
     */
    abstract get(...args: any[]): Promise<StorageResponse>;

    /**
     * To set all rows
     *
     * @param data
     */
    set?(data: I | ((...args: any[]) => void)): this;
}

export default Storage;
